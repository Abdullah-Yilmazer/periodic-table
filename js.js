$(document).ready(function () {
  $.ajax((url = "./data.json")).done(function (response) {
    $.each(response.en.elements, function (i, e) {
      var element = $(".element")[i];
      $(element).children(".atomnumarasi").html(e.number);
      $(element).children(".sembol").html(e.symbol);
      $(element).children(".isim").html(e.name);
      $(element)
        .children(".atomKutlesi")
        .html(e.atomic_mass.toString().includes("(") ? e.atomic_mass.split("(", 1) : e.atomic_mass);
      $(element).addClass(`${e.category} ${e.phase} ${e.block}`);
      $(element).css({ "--element-color": `#${e.cpkHex ? e.cpkHex.toString() : "888888"}`, "grid-area": `${e.ypos}/${e.xpos}` });
      $(element).css({ "--element-bg": `#${e.cpkHex ? e.cpkHex.toString() : "888888"}44`, "grid-area": `${e.ypos}/${e.xpos}` });
    });
  });

  //Paneli açma
  $(".element").click(function (e) {
    var element = Number(e.currentTarget.children[0].innerHTML) - 1;
    var elY = e.target.getBoundingClientRect().top;
    var elX = e.target.getBoundingClientRect().left;
    console.log(elY, elX,e);

    $.ajax((url = "./data.json")).done(function (response) {
      var atom = response.en.elements[element];
      var Html = `
        <div class="panel"
          style="
            --element-bg: #${atom.cpkHex ? atom.cpkHex.toString() : 888888}66 ;
            --element-color: #${atom.cpkHex ? atom.cpkHex.toString() : 888888};
            --panel-top: ${elY}px;
            --panel-left: ${elX}px; "
          >
          <div class='image-section'>
            <span class='sembol'>${atom.symbol}</span>
            <img src="${atom.image.url}" alt="${atom.image.attribution}" title="${atom.image.attribution}" class='element-image' />
            ${
              atom.bohr_model_3d !== null
                ? `            
            <div className='model-3D'>
              <model-viewer src=${atom.bohr_model_3d}
                poster=${atom.image.bohr_model_image}
                shadow-intensity=".5"
                auto-rotate
                auto-rotate-delay="0"
                camera-orbit="0deg 70deg 1m" />
            </div>`
                : ""
            }
          </div>
          <div class="info-section">
            <div><span>İsim</span><span>${atom.name}</span></div>
            <div><span>Atom numarası</span><span>${atom.number}</span></div>
            <div><span>Faz</span><span>${atom.phase}</span></div>
            ${
              atom.appearance !== null
                ? `<div>
                <span>Görünüm</span>
                <span>${atom.appearance}</span>
              </div>`
                : ""
            }
          </div>
          <div class='dropdowns'>
            <div class="dropdown">
              <input type="checkbox" id="dropdownCheckbox1" name="dropdownCheckbox" />
              <label for="dropdownCheckbox1" data-toggle="dropdown">Kordinatlar</label>
              <ul>
                <li><div><span>X pozisyonu</span><span>${atom.xpos}</span></div></li>
                <li><div><span>y pozisyonu</span><span>${atom.ypos}</span></div></li>
                <li><div><span>Periyot</span><span>${atom.period}</span></div></li>
                <li><div><span>Grup</span><span>${atom.group}</span></div></li>
              </ul>
            </div>
            <div class="dropdown">
              <input type="checkbox" id="dropdownCheckbox3" name="dropdownCheckbox" />
              <label for="dropdownCheckbox3" data-toggle="dropdown">Fiziksel Özellikler</label>
              <ul>
                ${atom.appearance !== null ? `<li><div><span>Görünüm</span><span>${atom.appearance}</span></div></li>` : ""}
                ${atom.density !== null ? `<li><div><span>Yoğunluk</span><span>${atom.density} g/cm3</span></div></li>` : ""}
                ${atom.boil !== null ? `<li><div><span>Kaynama Noktası</span><span>${atom.boil} K</span></div></li>` : ""}
                ${atom.melt !== null ? `<li><div><span>Ergime Noktası</span><span>${atom.melt} K</span></div></li>` :""}
                ${atom.phase !== null ? `<li><div><span>Faz</span><span>${atom.phase}</span></div></li>` : ""}
              </ul>
            </div>
            <div class="dropdown">
              <input type="checkbox" id="dropdownCheckbox4" name="dropdownCheckbox" />
              <label for="dropdownCheckbox4" data-toggle="dropdown">Elektron Yapılandırması</label>
              <ul>
                ${atom.category !== null ? `<li><div><span>Kategori</span><span>${atom.category}</span></div></li>` : ""}
                ${atom.electron_configuration !== null ? `<li><div><span>Elektron Yapılandırması</span><span>${atom.electron_configuration}</span></div></li>` : ""}
                ${atom.electron_affinity !== null ? `<li><div><span>Elektron Affinitesi</span><span>${atom.electron_affinity}</span></div></li>` : ""}
                ${atom.electronegativity_pauling !== null ? `<li><div><span>Elektronegativite (Pauling)</span><span>${atom.electronegativity_pauling}</span></div></li>` : ""}
                ${
                  atom.ionization_energies !== null && atom.ionization_energies.length !== 0
                    ? `<li><div><span>İyonlaşma Enerjileri</span><span>${atom.ionization_energies}</span></div></li>`
                    : ""
                }
              </ul>
            </div>
            <div class="dropdown">
              <input type="checkbox" id="dropdownCheckbox2" name="dropdownCheckbox" />
              <label for="dropdownCheckbox2" data-toggle="dropdown">Açıklama</label>
              <ul>
                ${atom.discovered_by !== null ? `<li><div><span>Keşfeden</span><span>${atom.discovered_by}</span></div></li>` : ""}
                ${atom.named_by !== null ? `<li><div><span>isim veren</span><span>${atom.named_by}</span></div></li>` : ""}
                ${atom.summary !== null ? `<li><p><span>${atom.summary}</span></p></li>` : ""}
              </ul>
            </div>
          </div>
        </div>
      `;
      $(".panelMain").html(Html);
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
