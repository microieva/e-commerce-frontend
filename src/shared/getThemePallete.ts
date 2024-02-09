import { PaletteMode } from "@mui/material";

export const getThemePalette = (mode: PaletteMode) => ({

  ...(mode === 'light' ? 
  {
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled': {
                color: 'red'
            }
          }
        }
      },
      MuiTable: {
        styleOverrides: {
          root: {
            '& .MuiTableBody-root': {
              backgroundColor: 'white',
              '& a': {
                color: 'rgb(61,61,61)'
              }
            }
          }
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            '& svg': {
              color: 'rgb(133, 133, 133)',
              '&:disabled': {
                color: 'red'
              }
            },
            '& .MuiToolbar-root': {
              backgroundColor: 'white'
            },
            '& .MuiTablePagination-select': {
              color: 'rgb(133, 133, 133)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '& .MuiPaper-root': {
              backgroundColor: '#272a2e',
              backgroundImage:'none',
              border: '1px solid rgb(61,61,61)',
              '& :hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            },
            '& form .MuiPaper-root:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }
        }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'orange'
            },
            '&  .MuiInputBase-root.Mui-focused:after': {
              borderBottom: '2px orange solid', 
            },
            '& .MuiFormHelperText-root': {
              color: 'rgb(253, 139, 51)'
            },
            '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiInput-root:before': {
              borderBottom: '1px darkgrey solid'
            }
          }
        },
      },
      MuiDialog: {
        defaultProps: {
          onClick: (e: any) => e.stopPropagation(),
          BackdropProps: {
            sx: {
              pointerEvents: 'none',
            },
          },
        },
      }
    } 
  }
  : 
  {
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            '&.MuiPaper-root': {
              backgroundColor: '#272a2e',
              backgroundImage:'none',
              border: '1px solid #84888d',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }
            }
          }
        }
      },
      MuiTable: {
        styleOverrides: {
          root: {
            '& .MuiTableBody-root': {
              backgroundColor: '#272a2e',
            }
          }
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            '& .MuiToolbar-root': {
              backgroundColor: '#272a2e'
            },
            '& .MuiSelect-select': {
              color: '#84888d'
            }
          }
        }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-root': {
              color: '#84888d'
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#429F42'
            },
            '&  .MuiInputBase-root.Mui-focused:after': {
              borderBottom: '2px #429F42 solid', 
            },
            '& .MuiFormHelperText-root': {
              color: 'rgb(253, 139, 51)'
            },
            '& .MuiFormControl-root.MuiTextField-root .MuiInputBase-root.MuiInput-root:before': {
              borderBottom: '2px #84888d solid'
            }
          }
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            '& .MuiPaper-root': {
              backgroundColor: 'rgb(7 10 13)',
              color: '#84888d',
              '& svg': {
                color: '#84888d',
              },
              '& svg:hover': {
                color: 'white'
              }
            }
          }
        },
        defaultProps: {
          onClick: (e: any) => e.stopPropagation(),
          BackdropProps: {
            sx: {
              pointerEvents: 'none',
            },
          },
        },
      }
    }
  }),
  palette: {
    mode
  }
});
  