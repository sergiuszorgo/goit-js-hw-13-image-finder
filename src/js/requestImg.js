function getImages(name, page) {
    const myApiKey = "19813353-ad59abac9068a994c96bcb173";
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=12&key=${myApiKey}`)
}

export default getImages;