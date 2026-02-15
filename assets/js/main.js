function includeHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error(error));
}

includeHTML("head", "pages/head.html");
includeHTML("header", "pages/components/header.html");
includeHTML("home", "pages/home.html");
includeHTML("footer", "pages/footer.html");