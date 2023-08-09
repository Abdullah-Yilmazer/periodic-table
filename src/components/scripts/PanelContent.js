import React from 'react';
import "../styles/PanelContent.css";

const PanelContent = ({ atom, elX, elY }) => {
  return (
    <div className="panel"
      style={{
        "--element-bg": `#${atom.cpkHex ? atom.cpkHex.toString() : "888888"}66 `,
        "--element-color": `#${atom.cpkHex ? atom.cpkHex.toString() : "888888"} `,
        "--panel-left": `${elY}px`,
        "--panel-top": `${elX}px`,
      }}>
      <div className='image-section'>
        <span className='symbol'>{atom.symbol}</span>
        <img src={atom.image.url} alt={atom.image.attribution} title={atom.image.attribution} className='element-image' />
        {
          atom.bohr_model_3d !== null ? (
            <div className='model-3D'>
              <model-viewer src={atom.bohr_model_3d}
                poster={atom.image.bohr_model_image}
                shadow-intensity=".5"
                auto-rotate
                auto-rotate-delay="0"
                camera-orbit="0deg 70deg 1m" />
            </div>
          ) : null
        }
      </div>


      <div className="info-section">
        <div>
          <span>İsim</span>
          <span>{atom.name}</span>
        </div>
        <div>
          <span>Atom numarası</span>
          <span>{atom.number}</span>
        </div>
        <div>
          <span>Faz</span>
          <span>{atom.phase}</span>
        </div>
        <div>
          <span>İsim</span>
          <span>{atom.name}</span>
        </div>
        <div>
          <span>Atom numarası</span>
          <span>{atom.number}</span>
        </div>
        <div>
          <span>Faz</span>
          <span>{atom.phase}</span>
        </div>
        {
          atom.appearance !== null ? (
            <div>
              <span>Görünüm</span>
              <span>{atom.appearance}</span>
            </div>
          ) : null
        }
      </div>
      <div className='dropdowns'>
        <div className="dropdown">
          <input type="checkbox" id="dropdownCheckbox1" name="dropdownCheckbox" />
          <label htmlFor="dropdownCheckbox1" data-toggle="dropdown">Kordinatlar</label>
          <ul>
            <li>
              <div>
                <span>X pozisyonu</span>
                <span>{atom.xpos}</span>
              </div>
            </li>
            <li>
              <div>
                <span>y pozisyonu</span>
                <span>{atom.ypos}</span>
              </div>
            </li>
            <li>
              <div>
                <span>Periyot</span>
                <span>{atom.period}</span>
              </div>
            </li>
            <li>
              <div>
                <span>Grup</span>
                <span>{atom.group}</span>
              </div>
            </li>
          </ul>
          <div className="dropdown">
            <input type="checkbox" id="dropdownCheckbox3" name="dropdownCheckbox" />
            <label htmlFor="dropdownCheckbox3" data-toggle="dropdown">Fiziksel Özellikler</label>
            <ul>
              {
                atom.appearance !== null ? (
                  <li><div><span>Görünüm</span><span>{atom.appearance}</span></div></li>
                ) : null
              }
              {
                atom.density !== null ? (
                  <li><div><span>Yoğunluk</span><span>{atom.density}</span></div></li>
                ) : null
              }
              {
                atom.boil !== null ? (
                  <li><div><span>Kaynama Noktası</span><span>{atom.boil}</span></div></li>
                ) : null
              }
              {
                atom.melt !== null ? (
                  <li><div><span>Ergime Noktası</span><span>{atom.melt}</span></div></li>
                ) : null
              }
              {
                atom.phase !== null ? (
                  <li><div><span>Faz</span><span>{atom.phase}</span></div></li>
                ) : null
              }
            </ul>
          </div>

          <div className="dropdown">
            <input type="checkbox" id="dropdownCheckbox4" name="dropdownCheckbox" />
            <label htmlFor="dropdownCheckbox4" data-toggle="dropdown">Fiziksel Özellikler</label>
            <ul>
              {
                atom.category !== null ? (
                  <li><div><span>Kategori</span><span>{atom.category}</span></div></li>
                ) : null
              }
              {
                atom.electron_configuration !== null ? (
                  <li><div><span>Elektron Yapılandırması</span><span>{atom.electron_configuration}</span></div></li>
                ) : null
              }
              {
                atom.electron_affinity !== null ? (
                  <li><div><span>Elektron Affinitesi</span><span>{atom.electron_affinity}</span></div></li>
                ) : null
              }
              {
                atom.electronegativity_pauling !== null ? (
                  <li><div><span>Elektronegativite (Pauling)</span><span>{atom.electronegativity_pauling}</span></div></li>
                ) : null
              }
              {
                atom.ionization_energies !== null && atom.ionization_energies.length !== 0 ? (
                  <li><div><span>İyonlaşma Enerjileri</span><span>{atom.ionization_energies}</span></div></li>
                ) : null
              }
            </ul>
          </div>
          <div className="dropdown">
            <input type="checkbox" id="dropdownCheckbox2" name="dropdownCheckbox" />
            <label htmlFor="dropdownCheckbox2" data-toggle="dropdown">Açıklama</label>
            <ul>
              {
                atom.discovered_by !== null ? (
                  <li><div><span>Keşfeden</span><span>{atom.discovered_by}</span></div></li>
                ) : null
              }
              {
                atom.named_by !== null ? (
                  <li><div><span>isim veren</span><span>{atom.named_by}</span></div></li>
                ) : null
              }
              {
                atom.summary !== null ? (
                  <li><p><span>{atom.summary}</span></p></li>
                ) : null
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelContent;