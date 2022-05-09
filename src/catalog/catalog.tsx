import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect, RootStateOrAny } from "react-redux";
import { Link } from "react-router-dom";
import { actions } from "../actions and const/actions";
import { EquipmentsType, OneOfEquipmentsArrayType, OneOfEquipmentType } from "../equipmentType/equipmentType";
import "./catalog.css";

type PropsType = {
    catalogHeightBody: number;
    equipments: EquipmentsType;
    equipmentTypeForSort: string;
    setSelectedEquipment: (item: OneOfEquipmentType) => void;
    isCatalogBodyOpen: boolean;
};

const Catalog = (props: PropsType) => {
    const sortedTypeEquiName: OneOfEquipmentsArrayType[] = [];
    const sortedEqui: OneOfEquipmentType[] = [];

    type KeyTitleWithoutContentType = {
        titleChar: string;
        allChar: string[];
    };
    const keyTitleWithContent: KeyTitleWithoutContentType[] = [];

    type IndexAndTotalCharNameSelectedFiltersButType = {
        totalCharName: string;
        index: number;
    };

    const [render, setRender] = useState(false);
    const [selectedCharFilters, setSelectedCharFilters] = useState<string[]>([]);
    const [indexAndTotalCharNameSelectedFiltersBut, setIndexAndTotalCharNameSelectedFiltersBut] = useState<
        IndexAndTotalCharNameSelectedFiltersButType[]
    >([]);


    const toCreateFilterBut = (totalCharName: string, index: number) => {


        let isDontHaveDupl = true

        const finded = indexAndTotalCharNameSelectedFiltersBut.findIndex((obj) => {
            if(obj.index === index && obj.totalCharName === totalCharName){
                return true
            }
        })

        if(finded !== -1){
            isDontHaveDupl = false
        }

        if(isDontHaveDupl){
            indexAndTotalCharNameSelectedFiltersBut.push({ totalCharName, index });
        }




    };


    const deleteFromIndexAndTotalCharNameSelectedFiltersBut = (totalCharName: string, index: number) => {
        const findedIndex = indexAndTotalCharNameSelectedFiltersBut.findIndex((obj) => {
            if (obj.index === index && obj.totalCharName === totalCharName) {
                return true;
            }
        });

        const rest = indexAndTotalCharNameSelectedFiltersBut.splice(findedIndex + 1);

        indexAndTotalCharNameSelectedFiltersBut.splice(findedIndex, findedIndex + 1);
        rest.forEach((r) => {
            indexAndTotalCharNameSelectedFiltersBut.push(r);
        });
    };

    const checkFilterButton = (isAddToFilter: boolean, filterName: string) => {
        if (isAddToFilter) {
            const finded = selectedCharFilters.find((charFilter) => {
                return charFilter === filterName;
            });
            if (finded === undefined) {
                selectedCharFilters.push(filterName);
            }
        } else {
            const finded = selectedCharFilters.findIndex((charFilter) => {
                return charFilter === filterName;
            });

            const rest = selectedCharFilters.splice(finded + 1);

            selectedCharFilters.splice(finded, finded + 1);
            rest.forEach((r) => {
                selectedCharFilters.push(r);
            });
        }
    };

    const sortEquipment = () => {
        if (selectedCharFilters.length === 0) {
            sortedTypeEquiName.forEach((equiArr) => {
                equiArr.forEach((equi) => {
                    sortedEqui.push(equi);
                });
            });
        }

        let indexSelectedCharFilter = 0;

        const filtrOnSelectedBut = () => {
            const sorterArrayInArray = selectedCharFilters.map((selectedCharFilter, indexSelectedFilter) => {
                indexSelectedCharFilter = indexSelectedFilter;

                const sorterArray = sortedTypeEquiName.map((equiArray) => {
                    return equiArray
                        .map((equi) => {
                            let isFit = false;


                            equi.characteristics.map((char) => {
                                const values = Object.values(char);

                                values.forEach((ch) => {
                                    if (ch === selectedCharFilter) {
                                        isFit = true;
                                    }
                                });
                            });

                            if (isFit) {
                                return equi;
                            }
                        })
                        .filter((j) => j != undefined);
                });

                return sorterArray;
            });

            return sorterArrayInArray;
        };

        const forReturn: OneOfEquipmentType[] = [];

        if (filtrOnSelectedBut() !== undefined) {
            filtrOnSelectedBut().forEach((arr1) => {

                arr1.forEach((arr2) => {
                    arr2.forEach((equi) => {
                        if (equi !== undefined) {
                            forReturn.push(equi);
                        }
                    });
                });
            });
        }

        const deleteNonFitOfMultiFilter = () => {
            const sortedEquiWithDuplicatesAndCount1: { [key: string]: number } = forReturn
                .map((equi) => {
                    let equiWithCount: any = Object.assign({ count: 1, equi: equi.name });
                    return equiWithCount;
                })
                .reduce((a: any, b: any) => {
                    a[b.equi] = (a[b.equi] || 0) + b.count;
                    return a;
                }, {});

            const pushFitEquiTo_ForReturnEquiFitFilter = () => {
                const fitNames: string[] = [];
                const fitEqui: OneOfEquipmentType[] = [];

                let index = 0;
                for (const key in sortedEquiWithDuplicatesAndCount1) {
                    const values = Object.values(sortedEquiWithDuplicatesAndCount1);

                    if (values[index] === indexSelectedCharFilter + 1) {
                        fitNames.push(key);
                    }
                    index++;
                }

                const findFitEquiByName = () => {
                    forReturn.forEach((equi) => {
                        fitNames.forEach((name) => {
                            if (equi.name === name) {
                                fitEqui.push(equi);
                            }
                        });
                    });
                };

                findFitEquiByName();

                return fitEqui;
            };

            pushFitEquiTo_ForReturnEquiFitFilter();

            return pushFitEquiTo_ForReturnEquiFitFilter();

        };

        const deleteDupl = () => {
            return deleteNonFitOfMultiFilter().filter((equi, i) => {
                if (deleteNonFitOfMultiFilter().indexOf(equi) === i) {
                    return equi;
                }
            });
        };

        return deleteDupl();
    };

    const createFiltersButtons = () => {
        const keyTitleWithoutContent: KeyTitleWithoutContentType[] = [];

        const createCratTitleWithoutContentAndPushToContentWittEmptyContent = () => {

            const createTitleCharWithEmptyContent = () => {
                const result: KeyTitleWithoutContentType[] = [];

                sortedTypeEquiName.forEach((equipmentsArray) => {
                    equipmentsArray.forEach((equi) => {
                        equi.characteristics.forEach((char) => {
                            const keys = Object.keys(char);

                            const concatValueAndKey = () => {
                                keys.forEach((key) => {
                                    const payload = {
                                        titleChar: key,
                                        allChar: [],
                                    };

                                    const checkDontDuplicate = (payload: KeyTitleWithoutContentType) => {
                                        let isHaveDupl = false;

                                        result.forEach((keyTitle) => {
                                            if (keyTitle.titleChar === payload.titleChar) {
                                                isHaveDupl = true;
                                            }
                                        });

                                        if (isHaveDupl === false) {
                                            return payload;
                                        }
                                    };

                                    if (checkDontDuplicate(payload) != undefined) {
                                        result.push(payload);
                                    }
                                });
                            };
                            concatValueAndKey();
                        });
                    });
                });

                return result;
            };

            createTitleCharWithEmptyContent();

            const addToKeyTitleWithoutContent = () => {
                createTitleCharWithEmptyContent().forEach((charArray) => {
                    keyTitleWithoutContent.push(charArray);
                });
            };

            const addContextWithoutAllCrahFor_keyTitleWithContent = () => {
                keyTitleWithoutContent.forEach((k) => {
                    keyTitleWithContent.push(k);
                });
            };

            addToKeyTitleWithoutContent();
            addContextWithoutAllCrahFor_keyTitleWithContent();


        };

        const addContentForKeyTitleWithContent = () => {
            const retuerNonDuplValue = (value: string) => {
                let isHaveDup = false;

                keyTitleWithContent.forEach((keyTitle) => {
                    keyTitle.allChar.forEach((char) => {
                        if (char === value) {
                            isHaveDup = true;
                        }
                    });
                });

                if (isHaveDup == false) {
                    return value;
                }
            };


            sortedTypeEquiName.forEach((equiArray) => {
                equiArray.forEach((equi) => {
                    equi.characteristics.forEach((char) => {
                        const values = Object.values(char);
                        const keys = Object.keys(char);

                        values.forEach((value, valueIndex) => {
                            const payload = retuerNonDuplValue(value);


                            if (payload != undefined) {
                                keyTitleWithContent.forEach((keyTitle) => {
                                    if (keyTitle.titleChar === keys[valueIndex]) {
                                        keyTitle.allChar.push(payload);
                                    }
                                });
                            }
                        });
                    });
                });
            });

        };

        createCratTitleWithoutContentAndPushToContentWittEmptyContent();
        addContentForKeyTitleWithContent();
    };

    const equipmentTypeSort = () => {
        Object.entries(props.equipments).find(([key, value]) => {
            if (props.equipmentTypeForSort === "all") {
                sortedTypeEquiName.push(value);
                return;
            }
            if (key == props.equipmentTypeForSort) {
                sortedTypeEquiName.push(value);
            }
        });
    };

    if (props.equipments) {
        equipmentTypeSort();
    }

    createFiltersButtons();

    sortEquipment().forEach((eq) => {
        sortedEqui.push(eq);
    });


    return (
        <>
            <div className="catalog-body" style={{ height: props.isCatalogBodyOpen ? "700px" : "0px" }}>
                <Row style={{ height: "100%" }}>
                    <Col md={2}>
                        <div className="catalog-filterBunCon">
                                {keyTitleWithContent.map((keyTitle) => {
                                    return (
                                        <>
                                            <div className="catalog-filter-title">{keyTitle.titleChar}</div>
                                            {keyTitle.allChar.map((char, index) => {
                                                indexAndTotalCharNameSelectedFiltersBut.findIndex(
                                                    (obj) => {
                                                        if (
                                                            obj.index === index &&
                                                            obj.totalCharName === keyTitle.titleChar
                                                        ) {
                                                            return true;
                                                        }
                                                    }
                                                );

                                                return (
                                                    <div style={{ position: "relative" }}>
                                                        <div
                                                            className="catalog-filter-but"
                                                            onClick={() => {
                                                                toCreateFilterBut(keyTitle.titleChar, index);
                                                                setRender(!render);
                                                                checkFilterButton(true, char);
                                                            }}
                                                        >
                                                            {char}

                                                            {indexAndTotalCharNameSelectedFiltersBut.findIndex(
                                                                (obj) => {
                                                                    if (
                                                                        obj.index === index &&
                                                                        obj.totalCharName === keyTitle.titleChar
                                                                    ) {
                                                                        return true;
                                                                    }
                                                                }
                                                            ) !== -1 ? (
                                                                <div
                                                                    className="catalog-filter-but-del"
                                                                    onMouseUp={() => {
                                                                        deleteFromIndexAndTotalCharNameSelectedFiltersBut(
                                                                            keyTitle.titleChar,
                                                                            index
                                                                        );
                                                                        checkFilterButton(false, char);
                                                                        setRender(!render);
                                                                    }}
                                                                >
                                                                    X
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </div>
                    </Col>
                    <Col md={10}>
                        <div className="catalog-itemCon">
                            {sortedEqui.map((item) => {
                                return (
                                    <Link to="/productPage">
                                        <div
                                            className="catalog-item"
                                            onClick={() => {
                                                props.setSelectedEquipment(item);
                                            }}
                                        >
                                            <img src={item.imgs[0]} className="catalog-item-img" />
                                            <div className="catalog-item-name">{item.name}</div>
                                            <div className="catalog-item-price">PRICE : {item.price} $</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootStateOrAny) => ({
    catalogHeightBody: state.mainPageState.catalogHeightBody,
    equipments: state.mainPageState.equipments,
    equipmentTypeForSort: state.mainPageState.equipmentTypeForSort,
    isCatalogBodyOpen: state.mainPageState.isCatalogBodyOpen,
});

export default connect(mapStateToProps, {
    setSelectedEquipment: actions.setSelectedEquipment,
})(Catalog);
