export const uploadImage = (file: Blob) => {
    const form = new FormData();
    form.append('image', file)
    return fetch('https://api.imgbb.com/1/upload?key=4f7ac27aa97fb5ccdeefca54c0864f8f', {
        method: "POST",
        body: form
    }).then(res => res.json())
}