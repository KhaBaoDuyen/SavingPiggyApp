import axios from "axios";

interface CloudinaryResponse {
    secure_url: string;
}

export const uploadAvatar = async (
    imageUri: string
): Promise<CloudinaryResponse> => {

    const formData = new FormData();

    formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: "avatar.jpg",
    } as any);

    formData.append("upload_preset", "savemate");

    const res = await axios.post<CloudinaryResponse>(
        "https://api.cloudinary.com/v1_1/dyrkozszp/image/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};