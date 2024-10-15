package com.example.movil

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.movil.activities.AdmitPatient
import okhttp3.Call
import okhttp3.Callback
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        makeGetRequest()
        val register = findViewById<Button>(R.id.main_btnIngresarPaciente)
        register.setOnClickListener {
            val intent = Intent(this, AdmitPatient::class.java)
            startActivity(intent)
        }
    }

    private fun makeGetRequest() {
        val host = getString(R.string.host)
        // Creamos un cliente HTTP
        val client = OkHttpClient()

        // Definimos la URL de la petición
        val request = Request.Builder()
            .url("$host/api/doctores") // Cambia la URL a la que necesites
            .build()

        // Ejecutamos la petición de forma asíncrona
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                // Manejo del error
                Log.e("MainActivity", "Error en la petición: ${e.message}")
            }

            override fun onResponse(call: Call, response: Response) {
                if (response.isSuccessful) {
                    // Obtenemos el cuerpo de la respuesta
                    val responseBody = response.body?.string()
                    Log.d(
                        "MainActivity",
                        "Respuesta: $responseBody"
                    ) // Imprimimos la respuesta en consola
                } else {
                    Log.e("MainActivity", "Error en la petición: ${response.code}")
                }
            }
        })
    }
}