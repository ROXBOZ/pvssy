import React, { useState } from "react";
import { EmailIcon, TelegramIcon, WhatsappIcon } from "react-share";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const ShareThis = () => {
  const shareUrl = window.location.href;
  const [isCopied, setIsCopied] = useState(false);
  const onShareWindowClose = (data) => {
    if (data.action === "shared") {
      console.log("Contenu partagé avec succès!");
    } else {
      console.log("Contenu non partagé.");
    }
  };

  const handleShareButtonClick = (event) => {
    event.preventDefault();
    const shareWindow = window.open(
      event.currentTarget.href,
      "shareWindow",
      "height=450,width=550"
    );
    shareWindow.opener = null; // For security reasons
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div>
      <div
        className="share-button"
        url={shareUrl}
        onShareWindowClose={onShareWindowClose}
      >
        <a
          aria-label="partager par email"
          className="tooltip"
          href="mailto:info@pvssy-talk.org"
        >
          <EmailIcon
            size={30}
            round={true}
            iconFillColor={{ fill: "#1f042f" }}
            bgStyle={{ fill: "#ce96ff" }}
          />
          <span className="tooltiptext">Email</span>
        </a>
        <Link
          aria-label="partager par WhatsApp"
          className="tooltip"
          to={`whatsapp://send?text=${shareUrl}`}
          onClick={handleShareButtonClick}
        >
          <WhatsappIcon
            size={30}
            round={true}
            iconFillColor={{ fill: "#1f042f" }}
            bgStyle={{ fill: "#ce96ff" }}
          />
          <span className="tooltiptext">WhatsApp</span>
        </Link>
        <Link
          aria-label="partager par Telegram"
          className="tooltip"
          to={`https://telegram.me/share/url?url=${shareUrl}`}
          onClick={handleShareButtonClick}
        >
          <TelegramIcon
            size={30}
            round={true}
            iconFillColor={{ fill: "#1f042f" }}
            bgStyle={{ fill: "#ce96ff" }}
          />
          <span className="tooltiptext">Telegram</span>
        </Link>
        <div className="copy-url-button-container">
          <div
            aria-label="copier l'url dans le presse-papier"
            role="button"
            onClick={copyUrlToClipboard}
            className=" tooltip copy-url-button"
          >
            <FontAwesomeIcon className="link-icon" icon={faLink} />
            <span className="tooltiptext">
              <p>{isCopied === true ? "URL copiée" : "copier"}</p>
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareThis;
