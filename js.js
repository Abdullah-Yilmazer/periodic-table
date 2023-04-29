$(document).ready(function () {

  $.ajax(url = "./data.json").done(function (response) {
    $.each(response.elements, function (i, e) {
      var element = $(".element")[i]
      $(element).children(".atomnumarasi").html(e.number)
      $(element).children(".sembol").html(e.symbol)
      $(element).children(".isim").html(e.name)
      $(element).children(".atomKutlesi").html(e.atomic_mass.toString().includes("(") ? e.atomic_mass.split("(", 1) : e.atomic_mass)
      $(element).addClass(`${e.category} ${e.phase} ${e.block}`);
      $(element).css({ "--color": `#${e.cpkHex ? e.cpkHex.toString() : "000"}`, "grid-area": `${e.ypos}/${e.xpos}` })
    });
  });

  //Paneli açma
  $(".element").click(function (e) {
    var element = Number(e.currentTarget.children[0].innerHTML) - 1
    $.ajax(url = "./data.json").done(function (response) {
      var data = response.elements[element]
      var Html = `
      <img src="${data.image.url}" alt="${data.image.attribution}" title="${data.image.attribution}" width="200px">
      <model-viewer src="${data.bohr_model_3d}" poster="${data.image.bohr_model_image}" shadow-intensity="1" ar ar-scale="fixed" camera-controls
        touch-action="pan-y" generate-schema></model-viewer>
      <p>
        <span>İsim</span>  
        <span>${data.name}</span>
      </p>
      <p>
        <span>Atom numarası</span>  
        <span>${data.number}</span>
      </p>
      <p>
        <span>Faz</span>  
        <span>${data.phase}</span>
      </p>`
      if (data.appearance != null) {
        Html += `
      <p>
        <span>Görünüm</span>  
        <span>${data.appearance}</span>
      </p>`
      }
      Html += `
      <div class="dropdown">
        <input type="checkbox" id="dropdownCheckbox" name="dropdownCheckbox">
        <label for="dropdownCheckbox" data-toggle="dropdown">Kordinatlar</label>
        <ul>
            <li>
              <span>X pozisyonu</span>  
              <span>${data.xpos}</span>    
            </li>
            <li>
              <span>y pozisyonu</span>  
              <span>${data.ypos}</span>    
            </li>
            <li>
              <span>Periyot</span>  
              <span>${data.period}</span>    
            </li>
            <li>
              <span>Grup</span>  
              <span>${data.group}</span>    
            </li>
        </ul>
      </div> 
      <div class="dropdown">
        <input type="checkbox" id="dropdownCheckbox" name="dropdownCheckbox">
        <label for="dropdownCheckbox" data-toggle="dropdown">Açıklama</label>
        <ul>
            <li>${data.summary}</li>
        </ul>
      </div> 

      `


      $(".panel").html(Html)
    });

    $(".panelMain").css("display", "block");
    $(".panel").css("left", 0);
  });

  //Panel kapatma
  $(".panelMain").click(function (e) {
    if (e.target.classList[0] == "panelMain") {
      $(".panel").css("left", "-400px");
      $(".panelMain").css("display", "none");
    }
  });
});
