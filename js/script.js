(async function () {
  const searchButton = document.querySelector("#search-button");
  const comboBox = document.getElementById("main-combobox");
  const text = document.getElementById("show-list__placeholder-text");
  const formElements = document.getElementsByClassName("search-form");

  const url = "https://dog.ceo/api/";
  const response = await fetch(url + "breeds/list");
  const jsonObj = await response.json();

  jsonObj.message.forEach((element) => {
    const formElement = document.getElementById("main-combobox");
    var option = document.createElement("option");
    option.text = element;
    formElement.add(option);
  });

  searchButton.addEventListener("click", async () => {
    text.innerHTML = comboBox.options[comboBox.selectedIndex].text;
    const count = parseInt(document.getElementById("main-input").value, 10);
    console.log(text.innerHTML);

    if (count > 0) {
      console.log(count);

      const getFoto = function () {
        const countVal = document
          .getElementById("main-input")
          .getAttribute("value");
        const count = parseInt(countVal, 10);

        var urlFoto = url;

        if (text.innerHTML === "") {
          urlFoto += "breeds/image/random/" + count;
        } else {
          urlFoto += `breed/${text.innerHTML}/images/random/` + count;
        }

        fetch(urlFoto)
          .then(function (responseObj) {
            return responseObj.json();
          })
          .then(function (response) {
            const foto = document.getElementById("show-list");
            foto.innerHTML = "";

            response.message.forEach((element) => {
              let li = document.createElement("li");
              let img = document.createElement("img");
              img.setAttribute("src", element);
              li.appendChild(img);
              foto.appendChild(li);

              console.log(count + " count");
            });
          });
      };

      document
        .getElementsByTagName("button")[0]
        .addEventListener("click", getFoto);

      document
        .getElementById("main-input")
        .addEventListener("input", function () {
          this.setAttribute("value", this.value);
        });
    } else {
      alert("Количество фото должно быть больше 0!!!");
    }
  });

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].addEventListener("keydown", function (element) {
      if (element.key === "Enter") {
        element.preventDefault();
        document.getElementsByTagName("button")[0].click();
      }
    });
  }
})();
