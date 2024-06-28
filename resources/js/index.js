const promises = magazines.map(magazine => {
  const url = "https://api.rss2json.com/v1/api.json?rss_url=" + magazine;
  return fetch(url).then(res => res.json());
})

Promise.all(promises).then(dataEle => {
  dataEle.forEach((data, index) => {
        const accordianEle = document.createElement("div");
        accordianEle.className = "accordion-item";
        accordianEle.innerHTML = `
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
            ${data.feed.title}
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? "show": ""}" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div id="carouselControls${index}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${index}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${index}" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
          </div>
        </div>
        `
        const dataItems = data.items;
        const accordianBody = accordianEle.getElementsByClassName("carousel-inner")[0];
        dataItems.forEach((carEle, idx) =>{
            const date = new Date(carEle.pubDate);
            const dateStr = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
            const carouselEle = document.createElement("div");
            carouselEle.className = `carousel-item ${idx === 0 ? "active" : ""}`;
            carouselEle.innerHTML = `
            <a href="${carEle.link}">
            <img src=${carEle.enclosure.link} class="d-block w-100">
            <h3 class="mt-3">Heading</h3>
            <span class="author-heading">${carEle.author}</span><span id="ellipse"></span><span class="author-heading">${dateStr}</span>
            <p>${carEle.description}</p>
            </a>
            `
            accordianBody.append(carouselEle);
        })
      document.getElementById("accordionExample").append(accordianEle);
    })
});
