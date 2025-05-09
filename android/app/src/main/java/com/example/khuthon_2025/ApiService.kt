package com.example.khuthon_2025

import com.example.myagriapp.model.AnalyzeResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
    @POST("/analyze")
    fun analyzeLocation(
        @Body body: Map<String, Double>
    ): Call<AnalyzeResponse>
}
