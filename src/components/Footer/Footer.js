import React from 'react'
import { BsGithub, BsLinkedin, BsWhatsapp } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'

const Footer = () => {

  const whatsapp = "+5491158094982";
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
            <h6>Acerca</h6>
            <p className="text-justify">Rick & Morty</p>
        </div>
      </div>
      <div className="container">
        <div className="row">
            <p className="copyright-text">
              Design | Iasenza Juan Carlos
            </p>
            <ul className="social-icons">

              <li>
                <a
                  className="whatsapp"
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsWhatsapp />
                </a>
              </li>
              <li>
                <a
                  className="email"
                  href="mailto:iasenzajuancarlos@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MdEmail />
                </a>
              </li>
              <li>
                <a
                  className="github"
                  href="https://github.com/jciasenza"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub />
                </a>
              </li>
              <li>
                <a
                  className="linkedin"
                  href="https://www.linkedin.com/in/juan-carlos-iasenza-8119501a9/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>
    </footer>
  )
};
export default Footer;

