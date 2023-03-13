import React from "react";
import ShareButton from "react-share/lib/ShareButton";
import {
  EmailIcon,
  FacebookMessengerIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

const ShareThis = () => {
  const shareUrl = window.location.href;

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

  return (
    <div>
      <ShareButton
        className="share-button"
        url={shareUrl}
        onShareWindowClose={onShareWindowClose}
      >
        <a
          className="tooltip"
          href={`mailto:?body=${shareUrl}`}
          onClick={handleShareButtonClick}
        >
          <EmailIcon size={25} round={true} />
          <span className="tooltiptext">Email</span>
        </a>
        <a
          className="tooltip"
          href={`whatsapp://send?text=${shareUrl}`}
          onClick={handleShareButtonClick}
        >
          <WhatsappIcon size={25} round={true} />
          <span className="tooltiptext">WhatsApp</span>
        </a>
        <a
          className="tooltip"
          href={`https://telegram.me/share/url?url=${shareUrl}`}
          onClick={handleShareButtonClick}
        >
          <TelegramIcon size={25} round={true} />
          <span className="tooltiptext">Telegram</span>
        </a>
      </ShareButton>
    </div>
  );
};

export default ShareThis;
