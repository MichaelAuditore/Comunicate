import React from "react";

export default () => {
  const Close = (event) => {
    event.preventDefault();
    const modal = document.getElementById("modal-close");
    modal.style.display = "none";
  };

  return (
    <div className="errDiv" id="modal-close">
      <p translate="yes" lang="es" id="text-tag"></p>
      <span className="closed" onClick={Close}>
        &times;
      </span>
    </div>
  );
};
