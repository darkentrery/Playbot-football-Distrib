import {Top376Component} from "../top376Component/Top376Component";
import BaseRoutes from "../../routes/BaseRoutes";
import VisibleMainWrapper from "../../redux/containers/VisibleMainWrapper";
import {useState} from "react";
import FaqItemList from "../FaqItemList/FaqItemList";
import { motion, AnimatePresence } from "framer-motion"


export const FaqPageComponent = () => {

    const FaqParagraph = ({title, children}) => {
        const [unfolded, setUnfolded] = useState(false);
        return (
            <div className={`faq-block ${unfolded ? 'unfolded' : ''}`} onClick={(e) => setUnfolded(!unfolded)}>
                <div className={"title"}>
                    <div className={unfolded ? 'orange-minus-icon' : 'black-plus-icon'}></div>
                    <span className={unfolded ? 'orange-700-16' : 'black-700-16'}>{title}</span>
                </div>
                <AnimatePresence >
                    {unfolded && (
                        <motion.div 
                            initial={{ height: 0 }} 
                            animate={{height: "auto"}} 
                            exit={{height: 0}}
                            transition={{ duration: 0.2 }}
                            className={`faq-block-text `}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
                
            </div>
        )
    }

    return (
        <VisibleMainWrapper>
            <div className={"rules-pattern-component"}>
                <Top376Component label={"Главная"} to={BaseRoutes.main}/>
                <div className={"block block-3"}>
                    <FaqParagraph title={"Что такое Сервис Коробка?"}>

                    </FaqParagraph>
                    <FaqParagraph title={"Что такое Бот Коробка в Телеграме?"}>
                        <span className={"black-400-14"}>Бот Коробка в Telegram позволяет вам создавать события на площадках, присоединяться к ним и управлять игрой с девайса.</span>
                        <span className={"black-400-14"}>Вся информация, собранная на мероприятиях, будет выгружаться в красивую базу данных на сайт korobkaplay.ru</span>
                        <span className={"black-400-14"}>Управлять игрой через плеер пока возможно только через Telegram Бот.</span>
                        <span className={"black-400-14"}>Весь остальной функционал доступен на этом сайте.</span>
                    </FaqParagraph>
                    <FaqParagraph title={"Могу ли я участвовать в мероприятиях без профиля?"}>
                        <span className={"black-400-14"}>Чтобы обеспечить беспрепятственный и персонализированный опыт для всех участников, необходимо иметь учетную запись на нашей платформе, чтобы присоединиться к мероприятию. Вот почему требуется регистрация:</span>
                        <FaqItemList>
                            <span className={"black-400-14"}>Связь и уведомления: Имея учетную запись, мы можем отправлять важные уведомления, обновления и сообщения, связанные с событиями, непосредственно вам. Это гарантирует, что вы получите своевременную информацию о деталях событий, изменениях и любых других соответствующих обновлениях.</span>
                            <span className={"black-400-14"}>Присоединение событий: регистрация обеспечивает интеграцию между вами, вашей личной учетной записью и событиями. Наличие профиля позволяет вам получать доступ к функциям, специфичным для мероприятия, просматривать историю вашего участия, отслеживать ваш прогресс и взаимодействовать с другими участниками через нашу платформу. Также профили и история выступлений зарегистрированных игроков, обеспечивающие сбалансированное и справедливое распределение команд.</span>
                            <span className={"black-400-14"}>Персонализация и улучшения: Ваша учетная запись позволяет нам предоставлять персонализированные функции и рекомендации с учетом ваших предпочтений и истории участия. Это улучшит ваш общий опыт и поможет нам предложить более индивидуальную и привлекательную платформу.</span>
                            <span className={"black-400-14"}>Безопасность и проверка: Наличие зарегистрированных учетных записей добавляет дополнительный уровень безопасности и проверки нашей платформе. Это помогает предотвратить несанкционированный доступ и гарантирует, что участники являются подлинными людьми, которые привержены участию в мероприятиях.</span>
                        </FaqItemList>
                        <span className={"black-400-14"}>Требуя регистрации, мы стремимся обеспечить безопасный, организованный и приятный опыт для всех участников. Это позволяет нам предлагать персонализированные функции, эффективную коммуникацию и эффективное управление событиями. Регистрация гарантирует, что у вас будет полный доступ ко всем преимуществам и функциям, которые может предложить наша платформа.</span>
                    </FaqParagraph>
                    <FaqParagraph title={"Какой уровень игроков?"}>
                        <span className={"black-400-14"}>Чтобы обеспечить сбалансированный состав команд, мы используем в нашей системе два метода распределения.</span>
                        <FaqItemList>
                            <span className={"black-400-14"}>Первый метод заключается в том, что наш админ вручную распределяет игроков на основе их предпочтений и оценки нашего админа. Этот подход учитывает пожелания отдельного игрока и экспертное мнение скаута для создания команд.</span>
                            <span className={"black-400-14"}>Второй метод — это автоматический процесс, в котором используются опыт профилей игроков и характеристики событий для разделения игроков на равные команды.</span>
                        </FaqItemList>
                        <span className={"black-400-14"}>Сочетая эти два метода, мы стремимся создавать честные и сбалансированные команды, повышая общее качество и конкурентоспособность наших игр, также это помогает соблюсти баланс в составах между более опытными игроками и новичками.</span>
                    </FaqParagraph>
                    <FaqParagraph title={"Какая стоимость участия?"}>
                        <span className={"black-400-14"}>Наши игры платные, и в их стоимость входят различные удобства и услуги, обеспечивающие высокое качество игры. Это включает в себя аренду поля, предоставление высококачественных мячей, манишек, доступ к раздевалкам и душевым (при наличии на месте). Кроме того, присутствует администратор для управления игрой и видеооператор для верификации результатов.</span>
                        <span className={"black-400-14"}>Однако мы также организуем регулярные бесплатные спонсорские мероприятия, на которых у игроков есть возможность возместить свои затраты. Для участия в этих мероприятиях необходимо выполнить определенные требования, которые могут различаться в зависимости от конкретного мероприятия. Эти требования установлены для обеспечения честного участия и права на предоставляемые возможности спонсорства.</span>
                        <span className={"black-400-14"}>Предлагая как платные, так и спонсируемые мероприятия, мы стремимся предоставить игрокам широкий спектр возможностей для участия в нашей платформе, удовлетворить различные предпочтения и повысить общую доступность нашего футбольного сервиса.</span>
                    </FaqParagraph>
                    <FaqParagraph title={"Могу ли я общаться с другими участниками или организаторами?"}>
                        <span className={"black-400-14"}>Для общения с другими участниками конкретного мероприятия вы можете использовать наше приложение или веб-сайт. Важно отметить, что вы должны быть участником игры, чтобы получить доступ к этим коммуникационным каналам.</span>
                        <span className={"black-400-14"}>Мы также поддерживаем официальные сообщества в городах, где мы представлены. Эти сообщества служат платформами для объявлений и обсуждений игр. Хотя любой может писать в эти сообщества, они в первую очередь предназначены для обмена информацией, связанной с играми.</span>
                        <span className={"black-400-14"}>Для связи с организаторами вы можете использовать вышеупомянутые методы, включая приложение, веб-сайт и официальные сообщества. Кроме того, у вас есть возможность связаться с организаторами по электронной почте.</span>
                    </FaqParagraph>

                    <FaqParagraph title={"Какие награды и достижения доступны в Playbox?"}>
                        <span className={"black-400-14"}>С помощью нашей цифровой платформы и возможностей видеозахвата у вас есть возможность эффективно отслеживать свой прогресс и достижения.</span>
                        <span className={"black-400-14"}>Наша платформа предлагает широкий спектр категорий достижений, включая достижения на основе участия, достижения индивидуальной производительности и достижения команды. Эти категории охватывают различные аспекты вашего участия и успеха в наших футбольных мероприятиях.</span>
                        <span className={"black-400-14"}>По мере развития и расширения нашей цифровой платформы список достижений будет соответствующим образом увеличиваться. Мы стремимся охватить все отслеживаемые аспекты вашей производительности и опыта в рамках нашей платформы, обеспечивая всестороннюю и мотивирующую систему достижений.</span>
                    </FaqParagraph>

                    <FaqParagraph title={"Как определяются места и рейтинги?"}>
                        <span className={"black-400-14"}>Результаты каждого матча записываются и вводятся в систему администратором матча в режиме реального времени. Для подтверждения результатов каждый матч снимается.</span>
                        <span className={"black-400-14"}>На основе этих записанных результатов личные профили обновляются с соответствующей информацией, такой как победы, поражения, забитые голы и другие показатели производительности. Эти данные являются основой для определения рейтинга и мест в нашей платформе.</span>
                        <span className={"black-400-14"}>Если у вас есть какие-либо вопросы или разногласия относительно записанных результатов, у вас есть возможность подать апелляцию. Наша команда рассмотрит вашу апелляцию и решит ее соответствующим образом, обеспечивая справедливость и точность в рейтинге и местах</span>
                    </FaqParagraph>

                    <FaqParagraph title={"Какие способы оплаты принимаются на платформе?"}>
                        <span className={"black-400-14"}>(скоро)</span>
                    </FaqParagraph>

                    <FaqParagraph title={"Есть ли возрастные ограничения для участия в мероприятиях?"}>
                        <span className={"black-400-14"}></span>
                    </FaqParagraph>

                    <FaqParagraph title={"Могу ли я организовать собственное футбольное мероприятие на платформе?"}>
                        <span className={"black-400-14"}>Если вы хотите стать организатором, пожалуйста, свяжитесь с нами. В качестве организатора мероприятия, вам необходимо соответствовать определенным требованиям, включая предоставление площадки, мячей и футболок. Кроме того, вам потребуется наличие статистического судьи, который будет отслеживать личную статистику игроков и контролировать игру, а также видеозапись и редактирование для подтверждения результатов и создания персональных моментов.</span>
                    </FaqParagraph>

                    <FaqParagraph title={"Как отслеживать свои показатели и статистику на платформе?"}>
                        <span className={"black-400-14"}>Все ваши персональные статистические данные доступны в вашем личном профиле. Вы нем вы можете отслеживать свою активность и прогресс.</span>
                    </FaqParagraph>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}