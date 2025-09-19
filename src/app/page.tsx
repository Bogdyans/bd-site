"use client"

import {useState, useEffect, useRef} from "react"
import {getWordForDays, getWordForHours, getWordForMinutes, getWordForSeconds} from "@/utils/vocab";

export default function GoofyBirthdayPage() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [visitorCount, setVisitorCount] = useState(0);
    const [showModal, setShowModal] = useState(false)

    const [nameValue, setNameValue] = useState("");
    const [messageValue, setMessageValue] = useState("");

    const musicRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const targetDate = new Date("2025-10-21T00:00:00")

        const updateCountdown = () => {
            const now = new Date()
            const difference = targetDate.getTime() - now.getTime()
            console.log(difference)

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            }
        }

        const fetchVisitCount = async () => {
            fetch('/api/visitors', {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                }
            })
                .then((resp) => resp.json())
                .then(data => setVisitorCount(data.num_of_visits));
        }

        updateCountdown();
        fetchVisitCount();
        const interval = setInterval(updateCountdown, 1000)

        musicRef.current = new Audio('audio/song.mp3');

        return () => {
            clearInterval(interval)

            if (musicRef.current) {
                musicRef.current.pause();
            }
        }
    }, [])

    const handleMusicButtonClick = () => {
        if (!musicRef.current) {
            return;
        }
        musicRef.current.play()
            .catch(error => {
                console.error("Ошибка воспроизведения музыки:", error);
            });
    }

    const handleSurpriseButtonClick = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleSend = () => {
        fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: nameValue, message: messageValue }),
        })
        .then(() => {
                setNameValue("");
                setMessageValue("");
            }
        ).catch(() => {
            console.log("Не удалось отправить сообщение(((")
        })
    }

    return (
        <div style={{backgroundColor: "#ffff00", minHeight: "100vh", fontFamily: "Comic Sans MS, cursive"}}>

            <div className="text-right p-2">
                <div className="counter inline-block">Посетитель #{visitorCount.toLocaleString()}</div>
            </div>

            <div className="marquee-container p-2">
                <div className="marquee-text text-xl font-bold">
                    *** ДОБРО ПОЖАЛОВАТЬ *** ПРИГОТОВТЕСЬ *** 21 ОКТЯБРЯ УЖЕ СКОРО *** А ПРЗДНОВАНИЕ ЕЩЕ РАНЬШЕ ***
                </div>
            </div>

            <center>
                <h1 className="rainbow-text text-6xl font-bold p-4" style={{textShadow: "3px 3px 0px #000000"}}>
                    ДЕНЬ РОЖДЕНИЯ БОГДАНА
                </h1>

                <div className=" text-8xl p-4">🎂</div>

                <table className="table-border shadow-2000s mx-auto mb-4" style={{backgroundColor: "#00ffff"}}>
                    <tbody>
                    <tr style={{backgroundColor: "#ff0000", color: "#000000"}}>
                        <td className="text-2xl font-bold p-4 blink">*** ИНФОРМАЦИЯ О ПРАЗДНИКЕ ***</td>
                    </tr>
                    <tr>
                        <td className="p-4" style={{backgroundColor: "#ffff00", color: "#ff0000"}}>
                            <div className="text-xl font-bold">🎉 ГРАНДИОЗНАЯ ВЕЧЕРИНКА! 🎉</div>
                            <div className="text-lg p-2">
                                📅 Дата: 19 ОКТЯБРЯ 2025
                                <br/>🕕 Время: Пока неизвестно
                                <br/>📍 Место: Секретная локация
                                <br/>🎵 Музыка, настолки и еда! Супер круть
                                <br/>🍰 ТортЫ
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table className="table-border shadow-2000s mx-auto mb-8" style={{backgroundColor: "#00ff00"}}>
                    <tbody>
                    <tr style={{backgroundColor: "#ff0000", color: "#000000"}}>
                        <td colSpan={4} className="text-2xl font-bold p-4 blink">
                            *** ВРЕМЯ ДО 21 ОКТЯБРЯ ***
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="p-4 text-xl font-bold bounce-2000s"
                            style={{backgroundColor: "#ff00ff", color: "#00ff00"}}
                        >
                            {timeLeft.days}
                            <br/>
                            {
                                getWordForDays(timeLeft.days)
                            }
                        </td>
                        <td className="p-4 text-xl font-bold shake"
                            style={{backgroundColor: "#00ffff", color: "#ff0000"}}>
                            {timeLeft.hours}
                            <br/>
                            {
                                getWordForHours(timeLeft.hours)
                            }
                        </td>
                        <td className="p-4 text-xl font-bold spin-fast"
                            style={{backgroundColor: "#ffff00", color: "#0000ff"}}>
                            {timeLeft.minutes}
                            <br/>
                            {
                                getWordForMinutes(timeLeft.minutes)
                            }
                        </td>
                        <td className="p-4 text-xl font-bold flash-bg" style={{color: "#ffffff"}}>
                            {timeLeft.seconds}
                            <br/>
                            {
                                getWordForSeconds(timeLeft.seconds)
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className="p-4">
                    <button
                        className="button-2000s p-4 m-2 text-xl"
                        onClick={handleMusicButtonClick}
                    >
                        *** НАЖМИТЕ ДЛЯ ПРАЗДНИЧНОЙ МУЗЫКИ ***
                    </button>
                    <button
                        className="button-2000s p-4 m-2 text-xl"
                        onClick={handleSurpriseButtonClick}
                    >
                        *** УДИВИТЬ МЕНЯ ***
                    </button>
                </div>


                <table className="table-border shadow-2000s mx-auto mb-4" style={{backgroundColor: "#ff00ff"}}>
                    <tbody>
                    <tr style={{backgroundColor: "#00ff00", color: "#000000"}}>
                        <td className="text-xl font-bold p-4">*** ОТПРАВЬТЕ МНЕ СООБЩЕНИЕ ***</td>
                    </tr>
                    <tr>
                        <td className="p-4">
                            <input
                                type="text"
                                placeholder="ВАШЕ ИМЯ..."
                                className="p-2 border-4 border-black w-full"
                                style={{backgroundColor: "#ffff00", color: "#ff0000"}}
                                value={nameValue}
                                onChange={(event) => setNameValue(event.target.value)}
                            />
                            <br/>
                            <br/>
                            <textarea
                                placeholder="ОСТАВЬТЕ СООБЩЕНИЕ, ПОЖЕЛАНИЕ ИЛИ ВОПРОС..."
                                className="p-2 border-4 border-black w-full"
                                style={{backgroundColor: "#00ffff", color: "#0000ff"}}
                                rows={3}
                                cols={30}
                                value={messageValue}
                                onChange={(event) => setMessageValue(event.target.value)}
                            />
                            <br/>
                            <br/>
                            <button className="button-2000s p-2 w-full" onClick={handleSend}>Отправить</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className="p-4" style={{backgroundColor: "#000000", color: "#00ff00"}}>
                    <div className=" text-lg font-bold">*** САЙТ К ДНЮ РОЖДЕНИЯ ***</div>
                    <div className="p-2">
                        <a href="#" style={{color: "#ffff00"}}>
                            &lt;&lt; СДЕЛАНО
                        </a>{" "}
                        |
                        <a href="#" style={{color: "#ff00ff"}}>
                            {" "}
                            С ЛЮБОВЬЮ
                            {" "}
                        </a>
                        {" "}
                        |
                        {" "}
                        <a href="#" style={{color: "#00ffff"}}>
                            БОГДАНОМ &gt;&gt;
                        </a>
                    </div>
                </div>

                <div className="p-4" style={{backgroundColor: "#ff0000", color: "#ffff00"}}>
                    <div className="blink text-lg font-bold">*** ЛУЧШЕ ВСЕГО СМОТРИТСЯ В 800x600***</div>
                    <div className="text-sm">
                        This page was created with Microsoft FrontPage 2000
                        <br/>
                        Last updated: {new Date().toLocaleDateString()}
                        <br/>
                        <span className="rainbow-text">*** HAPPY BIRTHDAY TO ME ***</span>
                    </div>
                </div>
            </center>


            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#ff00ff",
                            border: "5px solid #000000",
                            padding: "20px",
                            maxWidth: "500px",
                            fontFamily: "Comic Sans MS, cursive",
                        }}
                    >
                        <table className="table-border shadow-2000s" style={{ backgroundColor: "#00ff00", width: "100%" }}>
                            <tbody>
                            <tr style={{ backgroundColor: "#ffff00", color: "#ff0000" }}>
                                <td className="text-2xl font-bold p-4 text-center blink">*** СЮРПРИЗ! ***</td>
                            </tr>
                            <tr>
                                <td className="p-4" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
                                    <div className="text-lg text-center">
                                        🎉 ВАУ! 🎉<br/>
                                        <br/>
                                        Ты хочешь удивить меня!
                                        <br/>
                                        Это значит, что ты настоящий друг!
                                        <br/>
                                        <br/>🎂 Приходи на вечеринку 19 октября! (Если ты в Дубне) 🎂<br/>
                                        Будет весело, обещаю!
                                        <br/>
                                        <br/>💝 Если затрудняешься с выбором подарка, то можешь перейти на мой вишлист!
                                        💝
                                        <br/>
                                        Он постоянно пополняется
                                        <br/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 text-center" style={{ backgroundColor: "#00ffff" }}>
                                    <button
                                        className="button-2000s p-3 m-2 text-lg"
                                        onClick={() => window.open("https://followish.io/app/wishlists/y1wh0rtkua79ss", "_blank")}
                                    >
                                        *** ВИШЛИСТ ***
                                    </button>
                                    <button className="button-2000s p-3 m-2 text-lg" onClick={closeModal}>
                                        *** НАЗАД ***
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
