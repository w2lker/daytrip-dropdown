import React from "react";

function withLangContext <Props, Lang>(Child: React.ComponentType<Props>, Context: React.Context<Lang>, lang: Lang):React.FC<Props> {
  return (props) => {
    return (
      <Context.Provider value={lang}>
        <Child {...props}/>
      </Context.Provider>
      )
  };
}

export default withLangContext;
