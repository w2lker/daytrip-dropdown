const dropdownBodyFilterStyles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    padding: '15px 15px 12px'
  },
  magnify: {
    lineHeight: '14px',
    paddingRight: 15,
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    border: 0,
    fontSize: 14,
    color: '#445A65',
    backgroundColor: 'transparent',
    '&:focus': {
      outline: 'none'
    },
    '&::placeholder': {
      color: '#7A929E',
    },
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 0,
    height: 2,
    backgroundColor: '#D0D9DD',
    opacity: .5

  },
};

export default dropdownBodyFilterStyles;
