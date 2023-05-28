import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
const AutoObservation = () => {
  return (
    <div>
      <Helmet>
        <title>Guide d’auto observation</title>
        <meta
          name="description"
          content="Pour toute question de santé, il est important de prendre le temps d’observer et sentir son corps et ses symptômes. Pour cela, n’hésite pas à t’auto-observer."
        />
      </Helmet>
      <div className="title-aside-container">
        <h1>
          Guide d’auto-observation
          <img
            className="illu-animation-xl"
            src={require(`../../assets/images/auto-obs.png`)}
            alt=""
          />
        </h1>

        <div>
          <p className="subtitle">
            Pour toute question de santé, il est important de prendre le temps
            d’observer et sentir son corps et ses symptômes. Pour cela, n’hésite
            pas à t’auto-observer. Tu peux par exemple te déshabiller (tu peux
            retirer seulement le bas, c’est toi qui décide) devant un miroir et
            regarder ta vulve. Ta vulve est-elle rouge, enflée? As-tu
            l’impression d’avoir des ballonnements?
          </p>
          <p className="subtitle">
            Si tu te sens à l’aise, tu peux également t’auto-palper, c’est à
            dire te toucher au niveau du ventre, de la vulve, du clitoris, du
            vagin ou même du dos pour identifier comment et où sont localisées
            tes douleurs.
          </p>
          <p className="subtitle">
            Vas-y doucement, et observe les réactions de ton corps. Si tu ne te
            sens pas bien et que tu n’as pas l’habitude de te regarder, n’hésite
            pas à faire une pause et reprendre à un autre moment. C’est ton
            corps, vas-y à ton rythme.
          </p>
        </div>
      </div>

      <div className="title-aside-container">
        <h2>Comprendre ton anatomie</h2>
        <motion.figure whileTap={{ scale: 1.3 }}>
          <img
            src={require(`../../assets/images/shemas/vulva.png`)}
            alt="shéma de la vulve"
          />
          <figcaption>ici caption explicatif</figcaption>
        </motion.figure>
        <div>
          <h3 className="colored">Vulve</h3>
          <p>
            La vulve désigne l’ensemble des organes génitaux externes et protège
            ton vagin. C’est la partie extérieure que tu peux observer au
            miroir. Elle est constituée de ton pubis, tes lèvres externes et
            internes, le capuchon et le clitoris, le méat urinaire, le
            vestibule, et l’entrée du vagin.
          </p>
          <h3 className="colored">Vestibule</h3>
          <p>
            C’est la partie située entre tes lèvres internes qui entoure le méat
            urinaire et l’entrée de ton vagin.{" "}
          </p>
          <h3 className="colored">Vagin</h3>
          <p>
            C’est l’organe interne qui relie la vulve à l’utérus. C’est le
            conduit par lequel s’écoule (entre autres) le sang menstruel.
            <br /> <br />
            Ses parois se touchent au repos, mais elles s’élargissent lors de
            pénétrations avec les doigts, tampons, pénis, objets, et également
            lors du passage d’un bébé. Il a donc la capacité de s’adapter à son
            contenu. Les premiers centimètres sont rugueux, parfois irréguliers
            et deviennent ensuite lisses.
            <br /> <br />
            Le vagin n’est pas fait de muscles, c’est le périnée qui permet sa
            contraction, dans ses premiers centimètres (fais l’essai si ça
            t’intéresse: contracte ton périnée avec un doigt à l’intérieur. Seul
            le début du vagin se contracte).
            <br /> <br />
            La muqueuse est normalement humide, mais cela peut varier selon les
            périodes de la vie. La lubrification augmente lors de la grossesse,
            mais diminue lors de la ménopause. Des traitements médicamenteux et
            d’autres causes psychologiques peuvent également avoir un impact sur
            la lubrification naturelle de ton vagin.
          </p>
          <h3 className="colored">Périnée</h3>
          <p>
            Le périnée est un ensemble de muscles qui ferme le bas du bassin :
            il soutient la vessie, l’utérus et le rectum. Il est traversé par
            trois orifices : le vagin, l’anus et le méat urinaire. Ses fonctions
            sont de réguler la contraction de l’urètre, de l’anus et du vagin,
            il a donc un rôle dans la continence (c’est-à-dire le fait de
            pouvoir retenir ses urines et ses selles) et également dans la
            sexualité.
          </p>
          <Link to="../ressources/glossaire">↗ voir le glossaire</Link>
        </div>
      </div>
      <div className="title-aside-container">
        <h2>Prends des notes</h2>
        <div>
          <p>
            Une fois que tu t’es observé, écris ce que tu ressens et observe.
            Ces notes te permettront d’identifier comment et à quel moment les
            douleurs apparaissent. Tu pourras plus facilement communiquer avec
            des pros de la santé, et tu pourras également éviter certaines
            positions ou pratiques avec tes partenaires. Ce qui permettra de
            remettre le plaisir au centre de ta sexualité.
          </p>
          <ul className="breathing">
            <li>À quelle phase/jour de ton cycle menstruel es-tu ?</li>
            <li>
              Y a-t-il des gestes ou positions spécifiques qui provoquent les
              douleurs ?
            </li>
            <li>As-tu des douleurs en dehors des rapports sexuels ?</li>
            <li>As-tu mal pendant un rapport pénétratif ?</li>
            <li>As-tu mal lorsqu’on te touche, sans pénétration ?</li>
            <li>As-tu mal lorsque tu utilises du lubrifiant ?</li>
            <li>
              La douleur arrive t-elle à un moment précis ? (Quand tu es dans un
              moment d’excitation, avant ou pendant une pénétration, après un
              orgasme… ?)
            </li>
            <li>
              Ressens-tu les douleurs quand tu te masturbes solo ou lorsque tu
              es avec un ou une partenaire spécifique ?
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AutoObservation;
