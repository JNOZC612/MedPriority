package com.example.movil.activities

import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.movil.R
import com.example.movil.models.Area
import com.example.movil.models.Camilla
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import org.json.JSONObject
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale
import com.google.gson.Gson


class AdmitPatient : AppCompatActivity() {
    private val gson = Gson()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_admit_patient)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        val host = getString(R.string.host)
        val toolbar = findViewById<Toolbar>(R.id.admit_toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        toolbar.setNavigationOnClickListener {
            onBackPressedDispatcher
        }
        val spinner = findViewById<Spinner>(R.id.admit_gender)
        val options = listOf("M", "F")
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, options)
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinner.adapter = adapter
        requestAreas(host)

        val txtDOB = findViewById<EditText>(R.id.admit_txt_dob)
        txtDOB.setOnClickListener {
            val calendar = Calendar.getInstance()
            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH)
            val day = calendar.get(Calendar.DAY_OF_MONTH)
            val datePicker = DatePickerDialog(this, { _, selectedYear, selectedMonth, selectedDay ->
                val formattedMonth = selectedMonth + 1
                //YYYY-MM-DD
                val formattedDate =
                    String.format("%04d-%02d-%02d", selectedYear, formattedMonth, selectedDay)
                txtDOB.setText(formattedDate)
            }, year, month, day)
            datePicker.show()
        }
        val submit = findViewById<Button>(R.id.admit_btn_ingresar)
        submit.setOnClickListener {
            sendPatientData(host)
        }
        findViewById<EditText>(R.id.admit_txt_datetime).setOnClickListener {
            showDatePicker()
        }
    }

    private fun requestAreas(host: String) {
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
                                        this@AdmitPatient,
                                        android.R.layout.simple_spinner_item,
                                        nombresAreas
                                    )
                                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                                    val areaSpinner = findViewById<Spinner>(R.id.admit_area)
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
                                                position + 1
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

    private fun requestCamillas(host: String, idArea: Number) {
        val client = OkHttpClient()
        val request = Request.Builder()
            .url("$host/api/camillas/area?id_area=$idArea")
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
                                        this@AdmitPatient,
                                        android.R.layout.simple_spinner_item,
                                        numerosCamilla
                                    )
                                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                                    val camillaSpinner = findViewById<Spinner>(R.id.admit_camilla)
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

    private fun sendPatientData(host: String) {
        val txtName = findViewById<EditText>(R.id.admit_txt_nombre)
        val txtDOB = findViewById<EditText>(R.id.admit_txt_dob)
        val spinnerSex = findViewById<Spinner>(R.id.admit_gender)
        val txtEmail = findViewById<EditText>(R.id.admit_email)
        val txtAddress = findViewById<EditText>(R.id.admit_address)
        val txtPhone = findViewById<EditText>(R.id.admit_phone)
        val txtInsurance = findViewById<EditText>(R.id.admit_seguro)
        val txtDatetime = findViewById<EditText>(R.id.admit_txt_datetime)

        val nombre = txtName.text.toString()
        val fechaNacimiento = txtDOB.text.toString()
        val sexo = spinnerSex.selectedItem.toString()
        val email = txtEmail.text.toString()
        val direccion = txtAddress.text.toString()
        val telefono = txtPhone.text.toString()
        val seguro = txtInsurance.text.toString()
        val id_area = findViewById<Spinner>(R.id.admit_area).selectedItemPosition + 1
        //val id_camilla = findViewById<Spinner>(R.id.admit_camilla).selectedItem
        val datetime = txtDatetime.text.toString()

        val jsonObject = JSONObject().apply {
            put("nombre", nombre)
            put("fecha_nacimiento", fechaNacimiento)
            put("sexo", sexo)
            put("email", email)
            put("direccion", direccion)
            put("telefono", telefono)
            put("seguro", seguro)
            put("area", id_area)
            //put("camilla", id_camilla)
            put("hora_entrada", datetime)
        }

        val body = RequestBody.create(
            "application/json; charset=utf-8".toMediaType(),
            jsonObject.toString()
        )
        val client = OkHttpClient()
        val request = Request.Builder()

            .url("$host/api/pacientes/registrar") // Ajusta la URL según tu API
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                runOnUiThread {
                    Toast.makeText(this@AdmitPatient, "Error: ${e.message}", Toast.LENGTH_SHORT)
                        .show()
                }
            }

            override fun onResponse(call: Call, response: Response) {
                runOnUiThread {
                    if (response.isSuccessful) {
                        Toast.makeText(
                            this@AdmitPatient,
                            "Paciente ingresado con éxito",
                            Toast.LENGTH_SHORT
                        ).show()
                    } else {
                        Toast.makeText(
                            this@AdmitPatient,
                            "Error: ${response.message}",
                            Toast.LENGTH_SHORT
                        ).show()
                    }
                }
            }
        })
    }

    private fun showDatePicker() {
        val calendar = Calendar.getInstance()
        val year = calendar.get(Calendar.YEAR)
        val month = calendar.get(Calendar.MONTH)
        val day = calendar.get(Calendar.DAY_OF_MONTH)

        val datePickerDialog =
            DatePickerDialog(this, { _, selectedYear, selectedMonth, selectedDay ->
                // Después de seleccionar la fecha, muestra el TimePicker
                showTimePicker(selectedYear, selectedMonth, selectedDay)
            }, year, month, day)

        datePickerDialog.show()
    }

    private fun showTimePicker(year: Int, month: Int, day: Int) {
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
            val dtt = findViewById<EditText>(R.id.admit_txt_datetime)
            dtt.setText(formattedDateTime)

            // Aquí puedes usar formattedDateTime para insertar en MySQL
        }, hour, minute, true)

        timePickerDialog.show()
    }
}