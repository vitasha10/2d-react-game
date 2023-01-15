import Head from 'next/head'
import {useEffect, useReducer, useState} from "react";

const blocks = [
    {
        x: 1,
        y: 1
    },
    {
        x: 2,
        y: 1
    },
    {
        x: 3,
        y: 1
    },
    {
        x: 4,
        y: 1
    },
    {
        x: 5,
        y: 1
    },
    {
        x: 6,
        y: 1
    },
    {
        x: 7,
        y: 1
    },
    {
        x: 8,
        y: 1
    },
    {
        x: 9,
        y: 1
    },
    {
        x: 10,
        y: 1
    },
    {
        x: 11,
        y: 1
    },
    {
        x: 12,
        y: 1
    },
    ,
    {
        x: 13,
        y: 2
    },
    {
        x: 14,
        y: 3
    },
    {
        x: 14,
        y: 4
    },
    {
        x: 14,
        y: 5
    },
    {
        x: 14,
        y: 6
    },
    {
        x: 14,
        y: 8
    },
    {
        x: 1,
        y: 3
    },
    {
        x: 1,
        y: 4
    },
    {
        x: 1,
        y: 5
    },
    {
        x: 1,
        y: 6
    },
    {
        x: 0,
        y: 8
    },
    {
        x: 1,
        y: 8
    },
    {
        x: 2,
        y: 8
    },
    {
        x: 3,
        y: 7
    },,
    {
        x: 3,
        y: 8
    },
    {
        x: 6,
        y: 7
    },
    {
        x: 6,
        y: 8
    },
    {
        x: 7,
        y: 8
    },
    {
        x: 8,
        y: 8
    },
    {
        x: 9,
        y: 8
    },
    {
        x: 10,
        y: 8
    },
    {
        x: 11,
        y: 7
    },
    {
        x: 11,
        y: 8
    },
    {
        x: 12,
        y: 8
    },
    {
        x: 13,
        y: 8
    },
    {
        x: 5,
        y: 2
    },
    {
        x: 6,
        y: 3
    },
    {
        x: 7,
        y: 4
    },
    {
        x: 8,
        y: 5
    },
    {
        x: 8,
        y: 6
    }
]
function reducer(state, action) {
    switch (action.type) {
        case 'MOVE_UP':
            return {...state, vitashaTop: Math.max(state.vitashaTop - 1,0)}
        case 'MOVE_LEFT':
            if(blocks.filter((item,i) => {
                return item.y == state.vitashaTop && item.x + 1 == state.vitashaLeft
            }).length == 0) {
                return {...state, vitashaLeft: Math.max(state.vitashaLeft - 1,0)}
            }
            return {...state}
        case 'MOVE_DOWN':
            return {...state, vitashaTop: state.vitashaTop + 1}
        case 'MOVE_RIGHT':
            if(blocks.filter((item,i) => {
                return item.y == state.vitashaTop && item.x - 1 == state.vitashaLeft
            }).length == 0) {
                return {...state, vitashaLeft: Math.min(state.vitashaLeft + 1, 15)}
            }
            return {...state}
        case 'reset':
            return {...state, vitashaLeft: 0, vitashaTop: 0}

        default:
            return state
    }
}
const ogonn = [
    {
        x: 7,
        y: 3,
    },{
        x: 5,
        y: 8,
    },{
        x: 4,
        y: 8,
    },
    {
        x: 10,
        y: 7
    },
    {
        x: 15,
        y: 8
    }
]
const StaticBlock = ({y,x}) => {
    return <div className="h-20 w-20 bg-[black] absolute outline outline-2 outline-[red]" style={{
        top: y*80,
        left: x*80
    }}>

    </div>
}
export default function Home() {
    const [state, dispatch] = useReducer(reducer, {
        vitashaTop: 0,
        vitashaLeft: 0,
    });
    const [canFly, setFly] = useState(false)
    const [padalUse, setPadalUse] = useState(false)
    const [isDied, setDied] = useState(false)
    const [isWin, setWin] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [startOpen, setStartOpen] = useState(true)
    const [slini, setSkini] = useState([
        '/vitasha.png',
        '/скин1.png',
        '/скин2.png',
        '/скин3.png',
        '/скин4.png',
        '/скин5.png',
        '/скин6.png',
        '/скин7.png',
    ])
    const [activeSkin, setActiveSkin] = useState(0)
    const [nadya, setNadya] = useState({
        x: 13,
        y: 7
    })
    useEffect(() => {
        setActiveSkin(Math.floor(Math.random() * slini.length))
        if(isDied) return;
        if(isWin) return;
        if(startOpen) return;
        let timeoutID
        let localfly = false
        const handleKeyPress = (event) => {
            if (event.code === 'KeyW') {
                if(!localfly) {
                    setFly(true)
                    localfly = true
                    timeoutID = setTimeout(() => {
                        setFly(false)
                        localfly = false
                    }, 500)
                    dispatch({ type: 'MOVE_UP' })
                }
            } else if (event.code === 'KeyA') {
                dispatch({type: 'MOVE_LEFT'})
            } else if (event.code === 'KeyD') {
                dispatch({ type: 'MOVE_RIGHT' })
            } else if (event.code === 'Escape') {
                setMenuOpen(true)
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            clearTimeout(timeoutID)
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isWin,isDied,startOpen]);
    useEffect(() => {
        if(isDied) return;
        if(isWin) return;
        if(startOpen) return;
        if(nadya.y == state.vitashaTop && nadya.x == state.vitashaLeft) {
            setWin(true)
            return;
        }
        if(canFly) return;
        if(padalUse) return;
        if(state.vitashaTop > 9) {
            dispatch({ type: 'reset' })
            setDied(true)
            return;
        }
        if(ogonn.filter((item,i) => item.x == state.vitashaLeft && item.y == state.vitashaTop).length != 0) {
            dispatch({ type: 'reset' })
            setDied(true)
            return;
        }
        let timeoutID
        if(blocks.filter((item,i) => item.x == state.vitashaLeft && item.y - 1 == state.vitashaTop).length == 0){
            timeoutID = setTimeout(() => {
                dispatch({ type: 'MOVE_DOWN' })
                setPadalUse(false)
            }, 100)
        }
        return () => {
            clearTimeout(timeoutID)
        };
    })
    return <>
        <Head>
            <title>2d Game</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-[black] items-center flex justify-center w-screen h-screen">
            <div className="flex w-[1280px] h-[720px] bg-[grey] relative" >
                {menuOpen ? <div className="w-full h-full bg-[#0E0E0E] absolute top-0 left-0 z-50 outline outline-8 outline-[red]">
                    <h1 className={"font-bold text-center text-[48px] text-[red] mt-10"}>Меню</h1>
                    <div className="overflow-x-auto flex nowrap h-96 w-full">
                        {slini.map((item,i) => <img className="w-auto h-full" src={item} onClick={() => {
                            setActiveSkin(i)
                            setMenuOpen(false)
                        }}/>)}
                    </div>
                    <button className="px-10 font-bold text-center text-[48px] text-[red] mt-10 border border-4 rounded-[20px] border-[red] mx-auto flex bg-[#0E0E0E]" onClick={() => {
                        setMenuOpen(false)
                    }}>Вернуться</button>
                </div> : <></>}
                {startOpen ? <div className="w-full h-full bg-[#0E0E0E] absolute top-0 left-0 z-50 outline outline-8 outline-[red]">
                    <h1 className={"font-bold text-center text-[36px] text-[blue] mt-40 shaltayboltay"}>С<span className="text-[red] text-[48px]">и</span>м<span className="text-[red] text-[48px]">у</span>л<span className="text-[red] text-[48px]">я</span>т<span className="text-[red] text-[48px]">о</span>р <span className="text-[red] text-[48px]">ВИТАЛИ</span></h1>
                    <div className="overflow-x-auto flex nowrap h-48 w-full">

                    </div>
                    <button className="px-10 font-bold text-center text-[48px] text-[red] mt-10 border border-4 rounded-[20px] border-[red] mx-auto flex bg-[#0E0E0E]" onClick={() => {
                        dispatch({type: 'reset'})
                        setStartOpen(false)
                    }}>НАЧАТЬ</button>
                </div> : <></>}
                {isDied ? <div className="w-full h-full bg-[#0E0E0E] absolute top-0 left-0 z-50 outline outline-8 outline-[red]">
                    <h1 className={"font-bold text-center text-[48px] text-[red] mt-10"}>ВЫ ПРОИГРАЛИ</h1>
                    <img src={'/pobedit.png'} className="w-auto h-96 mx-auto" />
                    <button className="px-10 font-bold text-center text-[48px] text-[red] mt-10 border border-4 rounded-[20px] border-[red] mx-auto flex bg-[#0E0E0E]" onClick={() => {
                        dispatch({type:"reset"})
                        setDied(false)
                    }}>переПРОИГРАТЬ ХА ХА ХА</button>
                </div> : <></>}
                {isWin ? <div className="w-full h-full bg-[#0E0E0E] absolute top-0 left-0 z-50 outline outline-8 outline-[red]">
                    <h1 className={"font-bold text-center text-[48px] text-[red] mt-10"}>ВЫ ВСТРЕТИЛИСЬ С СМИРНОВОЙ НАДЕЖДОЙ ДМИТРИЕВНОЙ И ВЫЙГРАЛИ</h1>
                    <img src={'/nadya.png'} className="w-auto h-96 mx-auto" />
                    <button className="px-10 font-bold text-center text-[48px] text-[red] mt-10 border border-4 rounded-[20px] border-[red] mx-auto flex bg-[#0E0E0E]" onClick={() => {
                        dispatch({type:"reset"})
                        setWin(false)
                    }}>переПРОИГРАТЬ ХА ХА ХА</button>
                </div> : <></>}
                {blocks.map((item,i) => <StaticBlock key={"blocksksk"+item.x+" "+item.y} x={item.x} y={item.y}/>)}
                <div style={{
                    top: state.vitashaTop*80,
                    left: state.vitashaLeft*80,
                }} className="absolute h-20 w-20 shaltayboltay">
                    <img src={slini[activeSkin]} className="w-full h-full" />
                </div>
                {ogonn.map((item,i) => <div key={"ogonn"+i+item.x+" "+item.y} className="w-20 h-20 absolute" style={{
                    top: item.y*80,
                    left: item.x*80
                }}>
                    <img src={'/огонь.gif'} className="w-full h-full" />
                </div>)}
                <div className="w-20 h-20 absolute" style={{
                    top: nadya.y*80,
                    left: nadya.x*80
                }}>
                    <img src={'/nadya.png'} className="shaltayboltay w-full h-full" />
                </div>
            </div>
        </main>
    </>
}
