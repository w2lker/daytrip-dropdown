const dropdownBodyEmptyStyles = {
  wrapper: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    transform: 'translateY(-50%)',
    textAlign: 'center',
  },
  icon: {
    margin: '0 0 20px',
    color: '#B2C0C7',
    '& svg': {
      display: 'block',
      margin: '0 auto',
      width: 60,
    }
  },
  title: {
    fontWeight: 500,
    fontSize: 14,
    color: '#546F7B',
    paddingBottom: 10,
    margin: 0
  },
  description: {
    padding: '0 30px',
    fontSize: 14,
    color: '#546F7B',
    lineHeight: '24px',
    margin: 0
  },
};

export default dropdownBodyEmptyStyles;
