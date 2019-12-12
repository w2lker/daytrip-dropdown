const dropdownBodyFilterStyles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: 12
  },
  magnify: {
    lineHeight: '14px',
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    margin: '0 16px 0 15px',
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
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#D0D9DD',
    opacity: .5

  },
};

export default dropdownBodyFilterStyles;
