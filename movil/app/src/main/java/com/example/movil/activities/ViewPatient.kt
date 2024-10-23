package com.example.movil.activities

import android.app.DatePickerDialog
import android.app.Dialog
import android.app.TimePickerDialog
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SearchView
import androidx.appcompat.widget.Toolbar
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.movil.R
import com.example.movil.models.Area
import com.example.movil.models.Camilla
import com.example.movil.models.Movimiento
import com.example.movil.models.Paciente
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.gson.Gson
import okhttp3.Call
import okhttp3.Callback
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.Response
import org.json.JSONObject
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class ViewPatient : AppCompatActivity() {
    private val gson = Gson()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_view_patient)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        val host = getString(R.string.host)
        val toolbar = findViewById<Toolbar>(R.id.view_patient_toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        toolbar.setNavigationOnClickListener {
            onBackPressed()
        }
        val btnMostrarMod = findViewById<Button>(R.id.btnMostrarMod)
        btnMostrarMod.setOnClickListener {
            showBottomSheet(host)
        }
    }

    private fun showDatePicker(dialog: Dialog, view: Int) {
        val calendar = Calendar.getInstance()
        val year = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH)
        val day = calendar.get(Calendar.DAY_OF_MONTH)

        val datePickerDialog =
            DatePickerDialog(this, { _, selectedYear, selectedMonth, selectedDay ->
                // Después de seleccionar la fecha, muestra el TimePicker
                showTimePicker(selectedYear, selectedMonth, selectedDay, dialog, view)
            }, year, month, day)

        datePickerDialog.show()
    }

    private fun showTimePicker(year: Int, month: Int, day: Int, dialog: Dialog, view: Int) {
        val calendar = Calendar.getInstance()
        val hour = calendar.get(Calendar.HOUR_OF_DAY)
        val minute = calendar.get(Calendar.MINUTE)

        val timePickerDialog = TimePickerDialog(this, { _, selectedHour, selectedMinute ->
            // Formatea la fecha y hora seleccionada
            val selectedDateTime = Calendar.getInstance().apply {
                set(year, month, day, selectedHour, selectedMinute)
            }

            // Formato para MySQL
            val format = SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault())
            val formattedDateTime = format.format(selectedDateTime.time)

            // Muestra la fecha y hora en el TextView
            val dtt = dialog.findViewById<EditText>(view)
            dtt.setText(formattedDateTime)

            // Aquí puedes usar formattedDateTime para insertar en MySQL
        }, hour, minute, true)

        timePickerDialog.show()
    }

    private fun showBottomSheet(host: String) {
        val dialog = Dialog(this)
        dialog.setContentView(R.layout.movement_form)
        val txtDatetime = dialog.findViewById<EditText>(R.id.formDatetime)
        txtDatetime.setOnClickListener {
            showDatePicker(dialog, R.id.formDatetime)
        }
        val txtDateTimeE = dialog.findViewById<EditText>(R.id.formDatetimeE)
        txtDateTimeE.setOnClickListener {
            showDatePicker(dialog, R.id.formDatetimeE)
        }
        val btnConfirm = dialog.findViewById<Button>(R.id.formBtnConfirm)
        getAreas(host, dialog)
        btnConfirm.setOnClickListener {
            createMovement(host, dialog)
            dialog.dismiss()
        }
        dialog.show()
    }

    private fun createMovement(host: String, dialog: Dialog) {
        val client = OkHttpClient()
        val idCliente = findViewById<EditText>(R.id.view_txt_id).text.toString()
        val idArea = dialog.findViewById<Spinner>(R.id.formSpinnerArea).selectedItemPosition + 1
        val numCamilla =
            dialog.findViewById<Spinner>(R.id.formSpinnerCamilla).selectedItem.toString()
        val ingreso = dialog.findViewById<EditText>(R.id.formDatetime).text.toString()
        val egreso = dialog.findViewById<EditText>(R.id.formDatetimeE).text.toString()
        val jsonObject = JSONObject().apply {
            put("id_paciente", idCliente.toInt())
            put("id_area", idArea)
            put("numero", numCamilla.toInt())
            put("hora_entrada", ingreso)
            put("hora_salida", egreso)
        }
        val body = RequestBody.create(
            "application/json; charset=utf-8".toMediaType(),
            jsonObject.toString()
        )
        val url =
            "$host/api/movimiento/mover"
        val request = Request.Builder()
            .url(url)
            .post(body)
            .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("MOVER", "Error en la petición: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    response.body?.let { responseBody ->
                        val responseString = responseBody.string()
                        Log.d("Api response", responseString)
                        runOnUiThread {
                            searchMovement(idCliente.toInt())
                        }
                    }
                } else {
                    Log.e("MainActivity", "Error en la petición: ${response.code}")
                }
            }
        })
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        val inflater: MenuInflater = menuInflater
        inflater.inflate(R.menu.search_patient, menu)
        var searchItem: MenuItem? = menu?.findItem(R.id.action_search)
        var searchView: SearchView? = searchItem?.actionView as? SearchView
        searchView?.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                // Verificar si hay texto para buscar
                if (!query.isNullOrEmpty()) {
                    // Realizar la petición de búsqueda
                    searchPatient(query)
                }
                return false
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                // Manejar el cambio de texto en el cuadro de búsqueda
                return false
            }
        })

        return true
    }

    private fun getAreas(host: String, dialog: Dialog) {
        val client = OkHttpClient()
        val request = Request.Builder()
            .url("$host/api/areas")
            .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("AdmitPatient", "Error en la petición: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    response.body?.let { responseBody ->
                        val responseString = responseBody.string()
                        Log.d("Api response", responseString)
                        val areas = gson.fromJson(responseString, Array<Area>::class.java).toList()
                        if (areas.isNotEmpty()) {
                            val nombresAreas = areas.mapNotNull { it.nombre_area }
                            if (nombresAreas.isNotEmpty()) {
                                runOnUiThread {
                                    val adapter = ArrayAdapter(
                                        this@ViewPatient,
                                        android.R.layout.simple_spinner_item,
                                        nombresAreas
                                    )
                                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                                    val areaSpinner =
                                        dialog.findViewById<Spinner>(R.id.formSpinnerArea)
                                    areaSpinner.adapter = adapter

                                    areaSpinner.onItemSelectedListener = object :
                                        AdapterView.OnItemSelectedListener {
                                        override fun onItemSelected(
                                            parent: AdapterView<*>,
                                            view: View,
                                            position: Int,
                                            id: Long
                                        ) {
                                            requestCamillas(
                                                host,
                                                position + 1,
                                                dialog
                                            )
                                        }

                                        override fun onNothingSelected(parent: AdapterView<*>) {
                                        }
                                    }

                                }
                            } else {
                                Log.e("API RESPONSE", "NAMES EMPTY")
                            }
                        } else {
                            Log.e("API RESPONSE", "EMPTY")
                        }
                    }
                } else {
                    Log.e("MainActivity", "Error en la petición: ${response.code}")
                }
            }
        })
    }

    private fun requestCamillas(host: String, idArea: Number, dialog: Dialog) {
        val client = OkHttpClient()
        val url = "$host/api/camillas/area?id_area=$idArea";
        val request = Request.Builder()
            .url(url)
            .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("AdmitPatient", "Error en la petición: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    response.body?.let { responseBody ->
                        val responseString = responseBody.string()
                        Log.d("Api response", responseString)
                        val camillas =
                            gson.fromJson(responseString, Array<Camilla>::class.java).toList()
                        if (camillas.isNotEmpty()) {
                            val numerosCamilla = camillas.mapNotNull { it.numero }
                            if (numerosCamilla.isNotEmpty()) {
                                runOnUiThread {
                                    val adapter = ArrayAdapter(
                                        this@ViewPatient,
                                        android.R.layout.simple_spinner_item,
                                        numerosCamilla
                                    )
                                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                                    val camillaSpinner =
                                        dialog.findViewById<Spinner>(R.id.formSpinnerCamilla)
                                    camillaSpinner.adapter = adapter

                                    camillaSpinner.onItemSelectedListener = object :
                                        AdapterView.OnItemSelectedListener {
                                        override fun onItemSelected(
                                            parent: AdapterView<*>,
                                            view: View,
                                            position: Int,
                                            id: Long
                                        ) {

                                        }

                                        override fun onNothingSelected(parent: AdapterView<*>) {
                                        }
                                    }
                                }
                            } else {
                                Log.e("API RESPONSE", "BED EMPTY")
                            }
                        } else {
                            Log.e("API RESPONSE", "EMPTY")
                        }
                    }
                } else {
                    Log.e("AdmitPatient", "Error en la petición: ${response.code}")
                }
            }
        })
    }

    private fun searchPatient(query: String) {
        val client = OkHttpClient()
        val host = getString(R.string.host)
        // Crear la URL con el parámetro de búsqueda (id o nombre)
        val url = "$host/api/pacientes/buscar?id=$query&nombre=$query"

        // Construir la petición GET
        val request = Request.Builder()
            .url(url)
            .build()

        // Enviar la petición
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("SearchPatient", "Error en la petición: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                // Verificar si la respuesta es exitosa
                if (response.isSuccessful) {
                    response.body?.let { responseBody ->
                        val responseString = responseBody.string()
                        Log.d("SearchPatient", "Respuesta: $responseString")

                        // Aquí puedes procesar la respuesta, convertirla en un objeto si es necesario
                        val pacientes =
                            gson.fromJson(responseString, Array<Paciente>::class.java).toList()

                        // Si obtuviste resultados, puedes actualizar la UI
                        if (pacientes.isNotEmpty()) {
                            runOnUiThread {
                                val id = findViewById<EditText>(R.id.view_txt_id)
                                id.setText(pacientes[0].id_paciente.toString())
                                val nombre = findViewById<EditText>(R.id.view_txt_nombre)
                                nombre.setText(pacientes[0].nombre)
                                val dob = findViewById<EditText>(R.id.view_txt_dob)
                                dob.setText(pacientes[0].fecha_nacimiento)
                                val sex = findViewById<EditText>(R.id.view_txt_sexo)
                                sex.setText(pacientes[0].sexo)
                                val direction = findViewById<EditText>(R.id.view_txt_direccion)
                                direction.setText(pacientes[0].direccion)
                                val telefono = findViewById<EditText>(R.id.view_txt_telefono)
                                telefono.setText(pacientes[0].telefono)
                                val email = findViewById<EditText>(R.id.view_txt_email)
                                email.setText(pacientes[0].email)
                                val seguro = findViewById<EditText>(R.id.view_txt_seguro)
                                seguro.setText(pacientes[0].seguro)
                                searchMovement(pacientes[0].id_paciente)
                                findViewById<Button>(R.id.btnMostrarMod).isEnabled = true
                            }
                        } else {
                            Log.e("SearchPatient", "No se encontraron pacientes")
                        }
                    }
                } else {
                    Log.e("SearchPatient", "Error en la respuesta: ${response.code}")
                }
            }
        })
    }

    private fun searchMovement(id_paciente: Number?) {
        val client = OkHttpClient()
        val host = getString(R.string.host)
        // Crear la URL con el parámetro de búsqueda (id o nombre)
        val url = "$host/api/movimiento/last?id_paciente=$id_paciente"

        // Construir la petición GET
        val request = Request.Builder()
            .url(url)
            .build()

        // Enviar la petición
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("SearchMOVEMENT", "Error en la petición: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                // Verificar si la respuesta es exitosa
                if (response.isSuccessful) {
                    response.body?.let { responseBody ->
                        val responseString = responseBody.string()
                        Log.d("SearchMOVEMENT", "Respuesta: $responseString")

                        // Aquí puedes procesar la respuesta, convertirla en un objeto si es necesario
                        val movimientos =
                            gson.fromJson(responseString, Array<Movimiento>::class.java).toList()

                        // Si obtuviste resultados, puedes actualizar la UI
                        if (movimientos.isNotEmpty()) {
                            runOnUiThread {
                                val area = findViewById<TextView>(R.id.view_txt_area)
                                area.setText(movimientos[0].id_area.toString())
                                val camilla = findViewById<TextView>(R.id.view_txt_camilla)
                                camilla.setText(movimientos[0].id_camilla.toString())
                            }
                        } else {
                            Log.e("SearchMOVEMENT", "No se encontraron movimientos")
                        }
                    }
                } else {
                    Log.e("SearchMOVEMENT", "Error en la respuesta: ${response.code}")
                }
            }
        })
    }
}