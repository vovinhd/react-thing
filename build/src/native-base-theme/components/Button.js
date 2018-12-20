import variable from "../variables/platform";
export default (variables = variable) => {
    const platformStyle = variables.platformStyle;
    const platform = variables.platform;
    const darkCommon = {
        "NativeBase.Text": {
            color: variables.brandDark
        },
        "NativeBase.Icon": {
            color: variables.brandDark
        },
        "NativeBase.IconNB": {
            color: variables.brandDark
        }
    };
    const lightCommon = {
        "NativeBase.Text": {
            color: variables.brandLight
        },
        "NativeBase.Icon": {
            color: variables.brandLight
        },
        "NativeBase.IconNB": {
            color: variables.brandLight
        }
    };
    const primaryCommon = {
        "NativeBase.Text": {
            color: variables.btnPrimaryBg
        },
        "NativeBase.Icon": {
            color: variables.btnPrimaryBg
        },
        "NativeBase.IconNB": {
            color: variables.btnPrimaryBg
        }
    };
    const successCommon = {
        "NativeBase.Text": {
            color: variables.btnSuccessBg
        },
        "NativeBase.Icon": {
            color: variables.btnSuccessBg
        },
        "NativeBase.IconNB": {
            color: variables.btnSuccessBg
        }
    };
    const infoCommon = {
        "NativeBase.Text": {
            color: variables.btnInfoBg
        },
        "NativeBase.Icon": {
            color: variables.btnInfoBg
        },
        "NativeBase.IconNB": {
            color: variables.btnInfoBg
        }
    };
    const warningCommon = {
        "NativeBase.Text": {
            color: variables.btnWarningBg
        },
        "NativeBase.Icon": {
            color: variables.btnWarningBg
        },
        "NativeBase.IconNB": {
            color: variables.btnWarningBg
        }
    };
    const dangerCommon = {
        "NativeBase.Text": {
            color: variables.btnDangerBg
        },
        "NativeBase.Icon": {
            color: variables.btnDangerBg
        },
        "NativeBase.IconNB": {
            color: variables.btnDangerBg
        }
    };
    const buttonTheme = {
        ".disabled": {
            ".transparent": {
                backgroundColor: null,
                "NativeBase.Text": {
                    color: variables.btnDisabledBg
                },
                "NativeBase.Icon": {
                    color: variables.btnDisabledBg
                },
                "NativeBase.IconNB": {
                    color: variables.btnDisabledBg
                }
            },
            "NativeBase.Icon": {
                color: variables.brandLight
            },
            "NativeBase.IconNB": {
                color: variables.brandLight
            },
            backgroundColor: variables.btnDisabledBg
        },
        ".bordered": Object.assign({ ".dark": Object.assign({}, darkCommon, { backgroundColor: "transparent", borderColor: variables.brandDark, borderWidth: variables.borderWidth * 2 }), ".light": Object.assign({}, lightCommon, { backgroundColor: "transparent", borderColor: variables.brandLight, borderWidth: variables.borderWidth * 2 }), ".primary": Object.assign({}, primaryCommon, { backgroundColor: "transparent", borderColor: variables.btnPrimaryBg, borderWidth: variables.borderWidth * 2 }), ".success": Object.assign({}, successCommon, { backgroundColor: "transparent", borderColor: variables.btnSuccessBg, borderWidth: variables.borderWidth * 2 }), ".info": Object.assign({}, infoCommon, { backgroundColor: "transparent", borderColor: variables.btnInfoBg, borderWidth: variables.borderWidth * 2 }), ".warning": Object.assign({}, warningCommon, { backgroundColor: "transparent", borderColor: variables.btnWarningBg, borderWidth: variables.borderWidth * 2 }), ".danger": Object.assign({}, dangerCommon, { backgroundColor: "transparent", borderColor: variables.btnDangerBg, borderWidth: variables.borderWidth * 2 }), ".disabled": {
                backgroundColor: null,
                borderColor: variables.btnDisabledBg,
                borderWidth: variables.borderWidth * 2,
                "NativeBase.Text": {
                    color: variables.btnDisabledBg
                }
            } }, primaryCommon, { borderWidth: variables.borderWidth * 2, elevation: null, shadowColor: null, shadowOffset: null, shadowOpacity: null, shadowRadius: null, backgroundColor: "transparent" }),
        ".dark": {
            ".bordered": Object.assign({}, darkCommon),
            backgroundColor: variables.brandDark
        },
        ".light": Object.assign({ ".transparent": Object.assign({}, lightCommon, { backgroundColor: null }), ".bordered": Object.assign({}, lightCommon) }, darkCommon, { backgroundColor: variables.brandLight }),
        ".primary": {
            ".bordered": Object.assign({}, primaryCommon),
            backgroundColor: variables.btnPrimaryBg
        },
        ".success": {
            ".bordered": Object.assign({}, successCommon),
            backgroundColor: variables.btnSuccessBg
        },
        ".info": {
            ".bordered": Object.assign({}, infoCommon),
            backgroundColor: variables.btnInfoBg
        },
        ".warning": {
            ".bordered": Object.assign({}, warningCommon),
            backgroundColor: variables.btnWarningBg
        },
        ".danger": {
            ".bordered": Object.assign({}, dangerCommon),
            backgroundColor: variables.btnDangerBg
        },
        ".block": {
            justifyContent: "center",
            alignSelf: "stretch"
        },
        ".full": {
            justifyContent: "center",
            alignSelf: "stretch",
            borderRadius: 0
        },
        ".rounded": {
            // paddingHorizontal: variables.buttonPadding + 20,
            borderRadius: variables.borderRadiusLarge
        },
        ".transparent": Object.assign({ backgroundColor: "transparent", elevation: 0, shadowColor: null, shadowOffset: null, shadowRadius: null, shadowOpacity: null }, primaryCommon, { ".dark": Object.assign({}, darkCommon, { backgroundColor: null }), ".danger": Object.assign({}, dangerCommon, { backgroundColor: null }), ".warning": Object.assign({}, warningCommon, { backgroundColor: null }), ".info": Object.assign({}, infoCommon, { backgroundColor: null }), ".primary": Object.assign({}, primaryCommon, { backgroundColor: null }), ".success": Object.assign({}, successCommon, { backgroundColor: null }), ".light": Object.assign({}, lightCommon, { backgroundColor: null }), ".disabled": {
                backgroundColor: "transparent",
                borderColor: variables.btnDisabledBg,
                borderWidth: variables.borderWidth * 2,
                "NativeBase.Text": {
                    color: variables.btnDisabledBg
                },
                "NativeBase.Icon": {
                    color: variables.btnDisabledBg
                },
                "NativeBase.IconNB": {
                    color: variables.btnDisabledBg
                }
            } }),
        ".small": {
            height: 30,
            "NativeBase.Text": {
                fontSize: 14
            },
            "NativeBase.Icon": {
                fontSize: 20,
                paddingTop: 0
            },
            "NativeBase.IconNB": {
                fontSize: 20,
                paddingTop: 0
            }
        },
        ".large": {
            height: 60,
            "NativeBase.Text": {
                fontSize: 22,
            }
        },
        ".capitalize": {},
        ".vertical": {
            flexDirection: "column",
            height: null
        },
        "NativeBase.Text": {
            fontFamily: variables.btnFontFamily,
            marginLeft: 0,
            marginRight: 0,
            color: variables.inverseTextColor,
            fontSize: variables.btnTextSize,
            paddingHorizontal: 16,
            backgroundColor: "transparent"
            // childPosition: 1
        },
        "NativeBase.Icon": {
            color: variables.inverseTextColor,
            fontSize: 24,
            marginHorizontal: 16,
            paddingTop: platform === "ios" ? 2 : undefined
        },
        "NativeBase.IconNB": {
            color: variables.inverseTextColor,
            fontSize: 24,
            marginHorizontal: 16,
            paddingTop: platform === "ios" ? 2 : undefined
        },
        ".iconLeft": {
            "NativeBase.Text": {
                marginLeft: 0
            },
            "NativeBase.IconNB": {
                marginRight: 0,
                marginLeft: 16
            },
            "NativeBase.Icon": {
                marginRight: 0,
                marginLeft: 16
            }
        },
        ".iconRight": {
            "NativeBase.Text": {
                marginRight: 0
            },
            "NativeBase.IconNB": {
                marginLeft: 0,
                marginRight: 16
            },
            "NativeBase.Icon": {
                marginLeft: 0,
                marginRight: 16
            }
        },
        ".picker": {
            "NativeBase.Text": {
                ".note": {
                    fontSize: 16,
                    lineHeight: null
                }
            }
        },
        paddingVertical: variables.buttonPadding,
        // paddingHorizontal: variables.buttonPadding + 10,
        backgroundColor: variables.btnPrimaryBg,
        borderRadius: variables.borderRadiusBase,
        borderColor: variables.btnPrimaryBg,
        borderWidth: null,
        height: 45,
        alignSelf: "flex-start",
        flexDirection: "row",
        elevation: 2,
        shadowColor: platformStyle === "material" ? variables.brandDark : undefined,
        shadowOffset: platformStyle === "material" ? { width: 0, height: 2 } : undefined,
        shadowOpacity: platformStyle === "material" ? 0.2 : undefined,
        shadowRadius: platformStyle === "material" ? 1.2 : undefined,
        alignItems: "center",
        justifyContent: "space-between"
    };
    return buttonTheme;
};
//# sourceMappingURL=Button.js.map