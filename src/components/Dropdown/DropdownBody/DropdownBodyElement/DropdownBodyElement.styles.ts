const dropdownBodyElementStyles = {
  root: {
    fontWeight: 400,
    fontSize: 14,
    color: '#546F7B',
    padding:'10px 15px 10px 45px',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in',
    '&:hover': {
      backgroundColor: 'rgba(208,217,221, .3)',
      cursor: 'pointer'
    },
    '&:first-child': {
      marginTop: 15,
    },
    '&:last-child': {
      marginBottom: 15,
    }
  },
  focused: {
    color: '#445A64',
    backgroundColor: 'rgba(208,217,221, .3)',
    '&:hover': {
      color: '#304048',
      backgroundColor: 'rgba(208,217,221, .6)',
    }
  },
  selected: {
    color: '#299BF6',
    fontWeight: 500,
  }
};

export default dropdownBodyElementStyles;
