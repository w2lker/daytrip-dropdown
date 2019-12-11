import React from "react";

function withLangContext <Props, Lang>(Child: React.ComponentType<Props>, Context: React.Context<Lang>, lang: Lang):React.FC<Props> {
  const ContextProvider: React.FC<Props> = (props) => {
    return (
      <Context.Provider value={lang}>
        <Child {...props}/>
      </Context.Provider>
      )
  };
  ContextProvider.displayName = `WithLangContext(${Child.displayName}, ${Context.displayName})`;
  return ContextProvider;
}

export default withLangContext;
