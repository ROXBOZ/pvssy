import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PainSexo = () => {
  const location = useLocation();
  const articleId = location.state?.articleId;

  console.log("articleId :", articleId);

  useEffect(() => {
    if (articleId) {
      const articleEl = document.getElementById(articleId);
      if (articleEl) {
        articleEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [articleId]);

  return (
    <div id="article-sexologie">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
        labore modi iusto. Ullam at ex hic. Enim eligendi magni hic repellendus
        facilis assumenda explicabo, eius, deserunt illo eos architecto nihil?
      </p>
    </div>
  );
};

export default PainSexo;
