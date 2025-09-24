"use client"
import { IKUpload } from "imagekitio-next"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props"
import { useState } from "react"

export default function FileUpload(){
    const [uplaoding, setUploading ] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onError  = (err: {message: string}) =>{
        setError(err.message);
        setUploading(false)
    }
    return (
        <div>

        </div>
    )
}