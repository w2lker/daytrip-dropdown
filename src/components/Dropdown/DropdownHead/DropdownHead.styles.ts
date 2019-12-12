const dropdownHeadStyles = {
  wrapper: {
    background: '#ECF0F2',
    boxShadow: '0 2px 9px 0 rgba(146,166,176,0.15)',
    borderRadius: 4,
    position: 'relative',
    padding: '16px 30px'
  },
  label: {
    paddingBottom: 6,
    fontWeight: 500,
    fontSize: 10,
    color: '#445A64'
  },
  content: {
    fontSize: 16,
    fontWeight: 400,
    color: '#7A929E',
    letterSpacing: 0,
  },
  caret: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'transform 0.3s ease-in-out'
  },
  caretReverted: {
    transform: 'translateY(-50%) rotate(-180deg)'
  }
};

export default dropdownHeadStyles;
