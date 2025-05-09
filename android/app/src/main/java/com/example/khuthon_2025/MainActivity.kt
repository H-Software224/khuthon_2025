package com.example.khuthon_2025

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.example.myagriapp.model.AnalyzeResponse
import com.example.myagriapp.network.ApiClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private lateinit var latInput: EditText
    private lateinit var lngInput: EditText
    private lateinit var resultText: TextView
    private lateinit var analyzeButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        latInput = findViewById(R.id.latInput)
        lngInput = findViewById(R.id.lngInput)
        resultText = findViewById(R.id.resultText)
        analyzeButton = findViewById(R.id.analyzeButton)

        analyzeButton.setOnClickListener {
            val lat = latInput.text.toString().toDoubleOrNull()
            val lng = lngInput.text.toString().toDoubleOrNull()

            if (lat != null && lng != null) {
                val body = mapOf("lat" to lat, "lng" to lng)
                ApiClient.instance.analyzeLocation(body)
                    .enqueue(object : Callback<AnalyzeResponse> {
                        override fun onResponse(call: Call<AnalyzeResponse>, response: Response<AnalyzeResponse>) {
                            if (response.isSuccessful) {
                                resultText.text = response.body()?.result ?: "결과 없음"
                            } else {
                                resultText.text = "오류: ${response.code()}"
                            }
                        }

                        override fun onFailure(call: Call<AnalyzeResponse>, t: Throwable) {
                            resultText.text = "실패: ${t.message}"
                        }
                    })
            } else {
                Toast.makeText(this, "위도/경도를 정확히 입력해주세요.", Toast.LENGTH_SHORT).show()
            }
        }
    }
}
