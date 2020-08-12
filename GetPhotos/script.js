var searchInput = document.getElementById("searchVal")
var pageBtn = document.getElementById("pageBtn");
var imgDisplay = document.getElementById("display")
const pageObj = {};
function setData(){
    // console.log(key)
console.log(searchInput.value)  
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.pexels.com/v1/search?query="+searchInput.value+"per_page=10");

xhr.addEventListener("readystatechange", function() {
        if(xhr.status == 200){
            // console.log(xhr.response.per_page);
            show_images(JSON.parse(xhr.response));
        }
        else{
            console.log("Error Code is:" + xhr.status)
        }
});
xhr.setRequestHeader("Authorization", key);
xhr.send();
}

function show_images(x){
    console.log(x)
    var perPage = 10
    var pages = Math.ceil(x.total_results/perPage)
    console.log(pages)
    var length = x.photos.length
    console.log(length)
    pageBtn.innerHTML = ""
    let c = 1
    imgDisplay.innerHTML = ""
    for (var j = 0; j < length; j++) {
        display(x.photos[j]);
    }

    for (var i = 0; i < pages; i++) {
        if (i == 0) {
          let btnPrev = document.createElement("button");
          btnPrev.textContent = "PREVIOUS";
          btnPrev.addEventListener("click", function () {
            imgDisplay.innerHTML = "";
            pageCreation();
          });
          pageBtn.appendChild(btnPrev);
        }

    pageObj[c] = [perPage * (c - 1), perPage * c];
    var btn = document.createElement("button");

    btn.textContent = c;
    btn.addEventListener("click", function () {
      imgDisplay.innerHTML = "";
      console.log(btn.innerHTML)
       pageCreation();
    });
    pageBtn.appendChild(btn);

    if (i ==  pages - 1) {
        let btnNext = document.createElement("button");
        btnNext.textContent = "NEXT";
        btnNext.addEventListener("click", function () {
          // c = c+1
          imgDisplay.innerHTML = "";
          pageCreation();
        });
        pageBtn.appendChild(btnNext);
      }
      c++;
    }
    c = 1;
}
var btnColor = document.querySelectorAll("button");
var x = 1;

function pageCreation() {
    if (event.target.textContent == "NEXT") {
      if (Number(c) < Math.ceil(len / perPage)) {
        console.log(c)
        c = c + 1;
      }
    //   btnColor[x + c].setAttribute("class", "bg-primary");
    } else if (event.target.textContent == "PREVIOUS") {
      if (c > 1) {
        c = c - 1;
      }
    //   btnColor[x + c].setAttribute("class", "bg-primary");
    } else {
      c = Number(event.target.textContent);
      event.target.setAttribute("class", "bg-primary");
    }

    let startIndex = pageObj[c][0];
    let endIndex = pageObj[c][1];
    console.log(pageObj);
    // res
    //   .filter((a, ind) => ind >= startIndex && ind < endIndex)
    //   .forEach((ele) => {
    //     console.log(ele);
    //     //console.log("step")
    //     display(ele);
    //   });
  }

  function display(a) {
    // imgDisplay.innerHTML = ""
    console.log("ash")
    var imgData = a.src["large"]
    var image = document.createElement("img")
    image.setAttribute("src",imgData)
    image.setAttribute("width","150px")
    imgDisplay.appendChild(image)
  }