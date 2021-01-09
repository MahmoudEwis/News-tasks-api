/* If you want to use this application, you must register on the website https://newsapi.org/ and use the new URL instead of the used URL */
let xhttp = new XMLHttpRequest();
let products=[];
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      products= JSON.parse( xhttp.responseText).articles;
      display();
    }
};
xhttp.open("GET","http://newsapi.org/v2/everything?q=home&from=2020-12-09&sortBy=publishedAt&apiKey=c115ce39596a4e9b93918e5386db0e2a" , true);
xhttp.send();
function display(){
    let temp=``;
    for( let i=0;i<products.length;i++)
    {
        temp+=`
        <div class="col-xl-3  mb-3 rounded">
            <div class="card" style="width: 18rem;">
                <img src="${products[i].urlToImage}" class="card-img-top" alt="photo not found">
                <div class="card-body">
                <h5 class="card-title">${products[i].title}</h5>
                <p class="card-text">${products[i].description}</p>
                <a href="${products[i].url}" class="btn btn-primary">Read More</a>
                </div>
            </div>
        </div>`
    }
    document.getElementById("data-row").innerHTML=temp;
}
/* -----get departmentdata-------*/
function departmentdata(that){
    $("html , body").animate({scrollTop:'0'},50)
    $(that).addClass("red")
    $(that).parentsUntil(".navbar").siblings().find("a , div").removeClass("red")
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          products= JSON.parse( xhttp.responseText).articles;
          display();
        }
    };
    /*  */
    xhttp.open("GET","http://newsapi.org/v2/everything?q="+that.id+"&from=2020-12-09&sortBy=publishedAt&apiKey=c115ce39596a4e9b93918e5386db0e2a" , true);
    xhttp.send();
}
/* Show off the button */
$(window).scroll(function(){
    let wscroll = $(window).scrollTop();
    if( wscroll >=500)
    {
        $("#btnUp").fadeIn(500);
    }
    else
    {
        $("#btnUp").fadeOut(500);
    }
})
/* btn action to make window scroll to top */
$("#btnUp").click(function(){
    $("html , body").animate({scrollTop:'0'},1000)
})
/* search in the data */
function search(term)
{
    let temp=``;
    for( let i=0;i<products.length;i++)
    {
        if(products[i].title.toLowerCase().includes(term.toLowerCase()))
        {
            temp+=`
            <div class="col-xl-3  mb-3 rounded">
                <div class="card" style="width: 18rem;">
                    <img src="${products[i].urlToImage}" class="card-img-top" alt="photo not found">
                    <div class="card-body">
                    <h5 class="card-title">${products[i].title}</h5>
                    <p class="card-text">${products[i].description}</p>
                    <a href="${products[i].url}" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>`
        }
    }
    document.getElementById("data-row").innerHTML=temp;
}
/*--loading screen */
$("#loading").fadeOut(3000)
$("body").css("overflow","auto")
/* data of Specific country */
let category = Array.from(document.getElementsByClassName("category"))
for(let i=0; i<category.length ; i++)
{
   category[i].addEventListener("click",function(){
       let elem =$(category[i]).text();
       let perantelem=Array.from( $(category[i]).parents(':eq(2)'))
       let country = perantelem[0].id;
       console.log(country ,elem )
       xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            products= JSON.parse( xhttp.responseText).articles;
            display();
            }
        };
        xhttp.open("GET","http://newsapi.org/v2/top-headlines?country="+country+"&category="+elem+"&apiKey=c115ce39596a4e9b93918e5386db0e2a" , true);
        xhttp.send();
        console.log("http://newsapi.org/v2/top-headlines?country="+country+"&category="+elem+"&apiKey=c115ce39596a4e9b93918e5386db0e2a")
   })
}