import {PopupWrapperComponent} from "../../wrappers/popupWrapperComponent/PopupWrapperComponent";
import {useDispatch} from "react-redux";
import {allowOfferWindow} from "../../../redux/actions/actions";


export const AllowOfferComponent = ({isOpen}) => {
    const dispatch = useDispatch();
    const closeComponent = () => {
        dispatch(allowOfferWindow(false));
    }

    const paragraphs = [
        "Настоящее Пользовательское Соглашение («Соглашение») регулирует отношения между ИНДИВИДУАЛЬНЫМ ПРЕДПРИНИМАТЕЛЕМ НУРОВЫМ ГЕОРГИЕМ ВАЛЕРЬЕВИЧЕМ (РЕГИСТРАЦИОННЫЙ НОМЕР 305522333, ДАТА РЕГИСТРАЦИИ 05.04.2022) («Коробка») и Пользователями Платформы (как эти термины определены ниже), далее совместно именуемые «Стороны», а по отдельности – «Сторона».",
        "ЕСЛИ ВЫ ЗАХОДИТЕ НА САЙТ, ПОЛЬЗУЕТЕСЬ САЙТОМ, СКАЧИВАЕТЕ, ЗАГРУЖАЕТЕ, УСТАНАВЛИВАЕТЕ ИЛИ ИСПОЛЬЗУЕТЕ ПРИЛОЖЕНИЕ, ИСПОЛЬЗУЕТЕ БОТА, ИНЫМ ОБРАЗОМ ВЗАИМОДЕЙСТВУЕТЕ С БОТОМ, ТО ВЫ СОГЛАШАЕТЕСЬ И ПОДТВЕРЖДАЕТЕ, ЧТО ПОЛНОСТЬЮ ПРОЧИТАЛИ И ПОНЯЛИ НАСТОЯЩЕЕ СОГЛАШЕНИЕ, СОГЛАСНЫ С ЕГО УСЛОВИЯМИ И ПРИНИМАЕТЕ ИХ, А ТАКЖЕ ОБЯЗУЕТЕСЬ СОБЛЮДАТЬ ЕГО, А В СЛУЧАЕ НАРУШЕНИЯ КАКИХ-ЛИБО ЕГО ПОЛОЖЕНИЙ НЕСТИ ОТВЕТСТВЕННОСТЬ ЗА ТАКОЕ НАРУШЕНИЕ В СООТВЕТСТВИИ С НАСТОЯЩИМ СОГЛАШЕНИЕМ И ДЕЙСТВУЮЩИМ ЗАКОНОДАТЕЛЬСТВОМ ГРУЗИИ.",
        "Настоящее Соглашение имеет характер публичной оферты по смыслу Гражданского кодекса Грузии.",
        "1.\tТЕРМИНЫ И ОПРЕДЕЛЕНИЯ \n" +
        "Авторизация — действия Пользователя, связанные с заполнением на Платформе своих регистрационных данных, в следующем объеме: фамилия, имя, отчество, номер телефона, адрес электронной почты, адрес фактического проживания, ник в социальной сети Telegram, дата рождения, возраст, а в некоторых случаях - реквизиты банковской карты, фото.\n" +
        "Аккаунт — создаваемая Пользователем учетная запись, в которой хранятся данные о Пользователе на Платформе, необходимые для оказания Услуг, а также доступ к настройкам, Услугам и иной подобной информации.\n" +
        "Акцепт — принятие условий Соглашения посредством совершения любых действий, направленных на использование Платформы, в том числе установка Приложения, посещение Сайта, взаимодействие с Ботом. \n" +
        "Бот – программа, выполняющая автоматические заранее настроенные повторяющиеся задачи, имеющая специальный аккаунт в мессенджере Telegram под ником @playbot_playbot.\n" +
        "Плата за Услуги — денежные средства, перечисляемые Пользователем в пользу Коробки за оказываемые Услуги. \n" +
        "Платные Услуги – услуги, за пользование которыми на Платформе Коробка взимает Плату за Услуги.  \n" +
        "Контент — информация, данные, текст, фотографии, сообщения и другие материалы, размещаемые (загружаемые) Пользователями и Коробкой на Платформе.\n" +
        "Организатор события – Пользователь, который создает и модерирует Событие, а в случае Платного события – физическое лицо, которое платит специальный налог на профессиональный доход (самозанятый), или индивидуальный предприниматель, или юридическое лицо, которое создает и модерирует Платное событие. \n" +
        "Партнер — партнер(-ы) Коробки, обеспечивающий(-ие) возможность осуществления безналичного перевода денежных средств от Участников Платного события в пользу Организаторов Платного события, а также от Пользователей в пользу Коробки в рамках Подписки.\n" +
        "Платное событие – спортивное мероприятие, которое организовывает Организатор события посредством Платформы, за участие в котором Участник события вносит оплату (покупает билет) в пользу Организатора события с помощью услуг Партнера.\n" +
        "Платформа – в зависимости от контекста Сайт и / или Приложение и / или Бот.\n" +
        "Подписка – возможность использования Платных услуг в течение определённого периода за Плату за Услуги.  \n" +
        "Пользователь — физическое лицо, обладающее необходимой дееспособностью для заключения настоящего Соглашения, или физическое лицо, которое платит специальный налог на профессиональный доход (самозанятый), или индивидуальный предприниматель, или юридическое лицо, которое является стороной настоящего Соглашения и имеет право на использование Платформы в соответствии с настоящим Соглашением и на предусмотренных им условиях, прошедшее Авторизацию на Платформе.\n" +
        "Приложение — программа для смартфона Коробка (Korobkaplay), которая включает в себя дополнения и обновления, а также панель администратора (личный кабинет), расположенную по адресу в сети Интернет: [•].\n" +
        "Сайт – сайт в сети Интернет, расположенный по адресу: [•].\n" +
        "Событие – спортивное мероприятие, платное или бесплатное, организованное Пользователем посредством Платформы.\n" +
        "Услуги — совокупность услуг, оказываемых Коробкой с помощью Платформы, подробное описание которых приведено в п. 2.1 настоящего Соглашения, а также Платные услуги. \n" +
        "Устройство — смартфон, компьютер или иное устройство, в котором могут быть запущены Сайт / Приложение.\n" +
        "Участник события – Пользователь - физическое лицо.\n",
        "2.\tПРЕДМЕТ СОГЛАШЕНИЯ. УСЛОВИЯ ЗАКЛЮЧЕНИЯ СОГЛАШЕНИЯ\n" +
        "2.1.\tКоробка обеспечивает информационное и технологическое взаимодействие между Пользователями, а именно, между Организаторами и Участниками Событий, в том числе Платных событий, а именно, оказывает услуги по предоставлению технологической платформы, посредством которой Пользователю предоставляется возможность:\n" +
        "2.1.1.\tсоздавать События, модерировать создаваемые События (устанавливать регламент и управлять спортивным событием), участвовать в созданных другими Пользователями Событиях, просматривать информацию о созданных Пользователем Событиях и Событиях, созданных другими Пользователями, просматривать информацию о других Пользователях;\n" +
        "2.1.2.\tнастраивать отображение Контента в соответствии со своими предпочтениями и настройками;\n" +
        "2.1.3.\tпользоваться Платными Услугами;\n" +
        "2.1.4.\tпереводить денежные средства в безналичной форме от Участников Платных событий в пользу Организаторов Платных событий посредством Партнеров.\n" +
        "2.2.\tПлата за платные Услуги вносится либо за каждую отдельную Платную услугу, либо путем Подписки. \n" +
        "2.3.\tУслуги оказываются посредством Платформы.\n" +
        "2.4.\tНастоящее Соглашение заключается в момент Акцепта.\n" +
        "2.5.\tПрием Платы за Услуги, обработка платежа в размере Платы за Услуги и иные действия, связанные с движением денежных средств в процессе использования Платформы, в том числе движение денежных средств в рамках Подписки, осуществляется Партнером. \n" +
        "2.6.\tКоробка не осуществляет услуги по переводу денежных средств от Участников Платных событий в пользу Организаторов Платных событий. Переводы денежных средств осуществляет Партнер. \n",
        "3.\tСАЙТ, ПРИЛОЖЕНИЕ И БОТ (ПЛАТФОРМА)\n" +
        "3.1.\tПользователю предоставляется право на условиях простой неисключительной лицензии использовать Платформу в объёме и способами, указанными в настоящем Соглашении, при условии соблюдения Пользователем условий настоящего Соглашения. Передача и уступка лицензии не разрешаются. Любые права, явно не предоставляемые на основании данного Соглашения, остаются за Коробкой.\n" +
        "3.2.\tИсключительное право на Платформу принадлежит Коробке. Право пользования Платформой может передаваться Пользователю только Коробкой либо ее уполномоченными представителями.\n" +
        "3.3.\tПлатформа предоставляется на условиях «как есть» («as is»). Коробка не дает гарантий в отношении Платформы, кроме тех, которые прямо указаны в настоящем Соглашении или законодательстве Грузии. Коробка не гарантирует и не дает никаких обязательств в отношении соответствия Платформы требованиям Пользователя и его удовлетворения от использования Платформы, соответствия функций, содержащихся в Платформе, требованиям Пользователя, бесперебойной и безошибочной работы Платформы.\n" +
        "3.4.\tПользователь настоящим понимает, принимает и соглашается, что он самостоятельно несет ответственность за любой Контент, который он размещает на Платформе.\n" +
        "3.5.\tКонтент и иные материалы, которые Коробка размещает на Платформе, предоставляются Пользователю исключительно для личного использования и ознакомления.\n" +
        "3.6.\tИспользование Платформы требует подключение к сети Интернет, которое должно быть обеспечено Пользователем.\n" +
        "3.7.\tПри пользовании Платформой могут применяться тарифы сети мобильной связи Пользователя на передачу данных. Пользователь несет ответственность за уплату таких тарифов. Коробка не компенсирует Пользователю такие расходы.\n" +
        "3.8.\tКОРОБКА НЕ ГАРАНТИРУЕТ РАБОТУ ВСЕХ ФУНКЦИЙ, УКАЗАННЫХ В НАСТОЯЩЕМ СОГЛАШЕНИИ, НА ПРОТЯЖЕНИИ СУЩЕСТВОВАНИЯ ПЛАТФОРМЫ, И НЕ НЕСЕТ НИКАКУЮ ОТВЕТСВЕННОСТЬ ЗА СЛУЧАИ, КОГДА ВСЕ ИЛИ ЧАСТЬ ФУНКЦИЙ БУДУТ НЕ РАБОТАТЬ. ПОЛЬЗОВАТЕЛЬ ПОНИМАЕТ И СОГЛАШАЕТСЯ, ЧТО ОБЪЕМ ФУНКЦИЙ МОЖЕТ МЕНЯТЬСЯ.",
        "4.\tАВТОРИЗАЦИЯ НА ПЛАТФОРМЕ. УЧЁТНАЯ ЗАПИСЬ ПОЛЬЗОВАТЕЛЯ\n" +
        "4.1.\tПользователь обязуется при Авторизации предоставить достоверную информацию о себе и поддерживать эту информацию в актуальном состоянии, в противном случае Коробка имеет право по своему усмотрению отказать Пользователю в Авторизации или удалить соответствующую учетную запись. \n" +
        "4.2.\tКоробка оставляет за собой право в любой момент потребовать от Пользователя подтверждения данных, указанных при регистрации, непредоставление которых, по усмотрению Коробки, может быть приравнено к предоставлению недостоверной информации.\n" +
        "4.3.\tПользователь обязуется использовать учётную запись лично. Передача доступа к своей учётной записи третьим лицам запрещена. \n" +
        "4.4.\tПользователь обязан немедленно уведомить Коробку о любом случае несанкционированного (не разрешенного Пользователем) доступа к Аккаунту Пользователя и (или) о любом нарушении (подозрениях о нарушении) конфиденциальности своих средств доступа к Аккаунту. В целях безопасности, Пользователь обязан самостоятельно осуществлять безопасное завершение работы под своим Аккаунтом по окончании каждой сессии работы на Платформе. Коробка не отвечает за возможную потерю или порчу данных, а также другие последствия любого характера, которые могут произойти из-за нарушения Пользователем положений настоящего пункта Соглашения. \n" +
        "4.5.\tПользователь понимает, что Коробка не проверяет достоверность, вносимых другими Пользователями данных, а также не несет ответственность за недостоверность таких данных. \n" +
        "4.6.\tПользователь выражает своё согласие на использование его изображения, загруженного в свой Аккаунт.",
        "5.\tПРАВА И ОБЯЗАННОСТИ СТОРОН \n" +
        "5.1.\tПользователь вправе:\n" +
        "5.1.1.\tИспользовать Платформу при условии сохранения в неизменном виде комбинации, состава и содержания Платформы по сравнению с тем, как они предоставляются и/или рекомендуются для использования Коробкой.\n" +
        "5.1.2.\tИспользовать Платформу при условии соблюдения Пользователем ограничений, установленных настоящим Соглашением. Для использования Платформы Пользователь может: (i) создавать и удалять Аккаунт на условиях, установленных настоящим Соглашением; (ii) использовать базовые функциональные программные возможности; (iii) совершать иные действия, разрешенные Коробкой и не нарушающие права Коробки и других лиц.\n" +
        "5.2.\tПользователю запрещается:\n" +
        "5.2.1.\tКопировать, публиковать, распространять в коммерческих или некоммерческих целях Платформу, ее части или копии.\n" +
        "5.2.2.\tПереводить Платформу на другие языки, использовать в коммерческих или некоммерческих целях аудиовизуальные элементы, изображения, а также иные объекты интеллектуальной собственности, присутствующие на Платформе, кроме случаев, прямо разрешенных в настоящем Соглашении.\n" +
        "5.2.3.\tИспользовать Платформу способами, не предусмотренными настоящим Соглашением, и в целях, запрещенных законодательством Грузии.\n" +
        "5.2.4.\tИспользовать автоматизированные скрипты для взаимодействия с Платформой и ее элементами.\n" +
        "5.2.5.\tИзучать технологию, декомпилировать, деассемблировать, осуществлять расшифровку структуры Платформы, пытаться обойти технические и функциональные ограничения Платформы, модифицировать, создавать производные произведения на базе Платформы или ее элементов.\n" +
        "5.2.6.\tПередавать третьим лицам права в отношении Платформы, в том числе путём передачи Аккаунта, заключения договора или иным способом. Отчуждать или иным образом передавать Аккаунт или приобретать Аккаунт другого Пользователя.\n" +
        "5.2.7.\tВ случае, если в нарушение пункта 5.2.6 настоящего Соглашения Пользователь передал свой Аккаунт другому лицу, то все обязанности Пользователя в отношении него сохраняются у лица, которое передало свой Аккаунт. На лицо, получившее чужой Аккаунт, распространяются все обязанности, запреты и заверения Пользователя, предусмотренные настоящим Соглашением.\n" +
        "5.2.8.\tИспользовать Аккаунт другого Пользователя.\n" +
        "5.2.9.\tРазмещать на Платформе материалы и информацию, нарушающие действующее законодательство, включая, но не ограничиваясь следующим: порно, клевету, оскорбления, призывы к насилию, свержению власти, рассылку спама, вредоносных программ.\n" +
        "5.3.\tПользователь обязуется:\n" +
        "5.3.1.\tСоблюдать условия настоящего Соглашения. В случае несогласия Пользователя с действующим Соглашением он обязан прекратить использование Платформы, в том числе деинсталлировать Приложение.\n" +
        "5.3.2.\tВ момент создания Аккаунта указывать точную, реальную и правильную информацию. Обновлять свою информацию в Аккаунте по мере ее изменения.\n" +
        "5.3.3.\tНе нарушать права интеллектуальной собственности Коробки в отношении Платформы или ее элементов. В частности, Пользователь не имеет права копировать, транслировать, рассылать, публиковать и иным образом распространять и воспроизводить материалы (текстовые, графические, аудио- или видеоматериалы), входящие в состав Платформы.\n" +
        "5.3.4.\tСамостоятельно принимать меры по обеспечению безопасности своего Аккаунта и предотвращению его несанкционированного использования другими лицами. Пользователь обязуется не раскрывать и не передавать другим лицам свои идентификационные данные, с помощью которых возможна Авторизация (аутентификация) Пользователя. Незамедлительно сообщить Коробке о любых фактах несанкционированного использования Аккаунта, взлома и совершения иных подобных действий.\n" +
        "5.3.5.\tПо требованию Коробки подтвердить свои данные, требующиеся в связи с заключением и исполнением настоящего Соглашения и для соблюдения законодательства Грузии.\n" +
        "5.3.6.\tВозместить Коробке и (или) другим лицам любые убытки, возникшие у них в связи с действиями Пользователя, в том числе в связи с нарушением настоящего Соглашения, интеллектуальных прав или иных прав таких лиц.\n" +
        "5.3.7.\tСоблюдать все нормы применимого законодательства Грузии.\n" +
        "5.4.\tПользователь заверяет:\n" +
        "5.4.1.\tЧто он обладает дееспособностью, достаточной для заключения настоящего Соглашения.\n" +
        "5.5.\tЧто денежные средства, передаваемые в качестве Платы за Услуги, принадлежат ему на праве собственности, не обременены правами третьих лиц и он вправе распоряжаться ими по своему усмотрению. \n" +
        "5.6.\tКоробка обязуется: \n" +
        "5.6.1.\tОбеспечить Пользователю возможность пользоваться Платформой на условиях, изложенных в настоящем Соглашении, при условии соблюдения Пользователем положений настоящего Соглашения.\n" +
        "5.6.2.\tУведомлять Пользователя об изменениях условий настоящего Соглашения путем опубликования информации на Платформе.",
        "6.\tСРОК ДЕЙСТВИЯ, ИЗМЕНЕНИЕ И РАСТОРЖЕНИЕ СОГЛАШЕНИЯ\n" +
        "6.1.\tНастоящее Соглашение вступает в силу в момент Акцепта Пользователем и действует в течение всего срока использования Платформы.\n" +
        "6.2.\tПользователь вправе расторгнуть Соглашение в одностороннем порядке при условии прекращения использования Сайта и Приложения, его деинсталляции со всех Устройств, на которые оно было инсталлировано.\n" +
        "6.3.\tКоробка вправе расторгнуть Соглашение в одностороннем порядке с прекращением доступа и возможности использовать Платформу в случае любого, в том числе однократного, нарушения Пользователем условий настоящего Соглашения.\n" +
        "6.4.\tНастоящее Соглашение может быть изменено Коробкой в одностороннем порядке. Изменения вступают в силу с момента их публикации на Платформе.\n" +
        "6.5.\tЕсли после публикации информации о внесение изменений в Соглашение Пользователь продолжает использовать Приложение, то тем самым он соглашается с изменениями, внесенными в Соглашение. Пользователь не освобождается от обязательств, предусмотренных настоящим Соглашением с учетом внесенных в него изменений, если он не ознакомился с внесенными изменениями.\n" +
        "6.6.\tУсловия настоящего Соглашения распространяются на любые обновления Платформы, заменяющие или дополняющие исходную версию Платформы.",
        "7.\tОТВЕТСТВЕННОСТЬ И ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ \n" +
        "7.1.\tЗа нарушение условий Соглашения Стороны несут ответственность, установленную Соглашением и действующим законодательством Грузии. \n" +
        "7.2.\tСовокупный размер ответственности Коробки по Соглашению, включая размер штрафных санкций (пеней, неустоек) и (или) возмещаемых убытков, по любому иску или претензии в отношении Соглашения или его исполнения, ограничивается стоимостью Платы за Услуги, полученной Коробкой в течение месяца, в котором были понесены убытки, в случае, если данные убытки будут документально подтверждены, и в любом случае не могут превышать 10 000 руб.\n" +
        "7.3.\tКоробка не несет ответственности за: \n" +
        "7.3.1.\tПротивоправные или иные действия Пользователя и (или) других лиц, связанные с использованием Платформы.\n" +
        "7.3.2.\tУтрату Пользователем возможности доступа к его Аккаунту (утерю логина, пароля, иной информации, необходимой для использования Платформы).\n" +
        "7.3.3.\tНеполное, неточное или некорректное указание Пользователем своих данных при создании Аккаунта.\n" +
        "7.3.4.\tОтсутствие у Пользователя доступа в сеть Интернет или низкое качество связи.\n" +
        "7.3.5.\tНеперечисление Платы за Услуги, произошедшее по любой причине, в том числе по вине Партнера. \n" +
        "7.3.6.\tПрямой или косвенный ущерб, а также упущенную выгоду Пользователя или других лиц в результате использования либо невозможности использования Платформы; несанкционированного доступа других лиц к персональной информации Пользователя, включая ту, которая привязана к созданному им Аккаунту.\n" +
        "7.4.\tКоробка освобождается от ответственности за полное или частичное неисполнение обязательств по настоящему Соглашению, если такое неисполнение является следствием действия непреодолимой силы (форс-мажор), в том числе массовых беспорядков, запретов, наложенных властями, иных действий, бездействия, решений органов государственной власти и местного самоуправления, стихийных бедствий, пожаров, катастроф, эпидемий, а также вследствие сбоев в телекоммуникационных и электрических сетях, действий вредоносных программ, а также недобросовестных действий других лиц, направленных на получение несанкционированного доступа или выведение из строя программного или аппаратного комплекса, изменение законов и нормативных актов.\n" +
        "7.5.\tКоробка не гарантирует, что:\n" +
        "7.5.1.\tПлатформа будет удовлетворять субъективным требованиям и ожиданиям Пользователя.\n" +
        "7.5.2.\tПлатформа будет работать быстро, без технических сбоев, надёжно и без ошибок.\n" +
        "7.5.3.\tКачество Платформы, его элементов, а также информация, полученная при использовании Приложения, будет соответствовать ожиданиям Пользователя.\n" +
        "7.5.4.\tПлатформа будет доступно для использования круглосуточно, в определенный момент времени или в течение определенного периода.\n" +
        "7.6.\tПользователь соглашается с тем, что никакое ПО не свободно от ошибок. Платформа предоставляется со стандартными для всех Пользователей функциями на общепринятом в мировой практике принципе «как есть» («as is»). \n" +
        "7.7.\tКоробка прилагает все усилия, чтобы поддерживать точность и актуальность Контента, но не гарантирует отсутствие возможных ошибок, неточности, недостоверности, корректировки Контента. \n" +
        "7.8.\tВ случае утери и (или) разглашения Пользователем логина и пароля доступа к Платформе, Пользователь самостоятельно несет риск возможных неблагоприятных для него последствий. \n" +
        "7.9.\tПлатежная инфраструктура Платформы построена исключительно на финансовых сервисах Партнеров и не подпадает под требования по открытию НКО (небанковской кредитной организации) или иных положений Федерального Закона от 27.06.2011 № 161-ФЗ “О национальной платежной системе”. \n" +
        "7.10.\tПользователь соглашается с тем, что Коробка не несет ответственности за сбои в работе платежных систем и Партнеров, непосредственно осуществляющих сами денежные переводы. \n" +
        "7.11.\tКоробка не обрабатывает на своей стороне данные банковских карт Пользователей и тем более не хранит подобные данные на своей стороне. Обработкой ввода данных карт, проведением самих платежей занимаются Партнеры. \n" +
        "7.12.\tПлатформа не является приложением и (или) интернет-ресурсом для азартных игр. Коробка не предоставляет услуг в области азартных игр. \n" +
        "7.13.\tПользователь понимает, что модификация Платформы и ее элементов осуществляется посредством создания и установки новых частей программного обеспечения (патчей), что может привести к удалению или приостановлению доступа к определённым элементам Платформы. Пользователь настоящим признаёт, что данные действия являются неотъемлемой частью процесса создания Платформы, и даёт согласие на совершение данных действий без его предварительного уведомления и согласия.",
        "8.\tИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ\n" +
        "8.1.\tПлатформа, в том числе исходный и объектный код, а также иные составляющие программы для ЭВМ, базы данных, произведения дизайна, графика, пользовательский интерфейс, тексты, звуковые эффекты, музыкальное сопровождение, фотографии, изображения, анимация и видео, а также на любые другие элементы, а также средства индивидуализации (фирменное наименование, товарные знаки, знаки обслуживания, коммерческие обозначения) составляют и (или) содержат в себе объекты интеллектуальной собственности (результаты интеллектуальной деятельности), исключительное право на которые принадлежит Коробке и, если применимо, ее законным правообладателям.\n" +
        "8.2.\tЛюбое использование объектов интеллектуальной собственности, включенных в Платформу, или ее частей не в целях использования Платформы запрещено.\n" +
        "8.3.\tИспользование Платформы не предусматривает передачу прав на Платформу или ее компоненты. Пользователю предоставляется ограниченное право на использование Платформы в соответствии с условиями Соглашения. Такое право может быть прекращено в любое время Коробкой по собственному усмотрению, независимо от причин.\n" +
        "8.4.\tКоробка вправе устанавливать любые технические ограничения использования Платформы, которые время от времени будут доводиться до сведения Пользователя в форме и способом по выбору Коробки.",
        "9.\tГАРАНТИИ БЕЗОПАСНОСТИ ПЛАТЕЖЕЙ \n" +
        "9.1.\tВсе платежи проводятся Партнерами, или иными партнерами, информация о которых в той или иной мере размещена на Платформе или в Соглашении. \n" +
        "9.2.\tВ случае возникновения вопросов по совершенному платежу, Пользователь может обратиться в службу поддержки. \n" +
        "9.3.\tДанные банковской карты передаются только в зашифрованном виде и не сохраняются на Платформе. \n" +
        "9.4.\tБезопасность обработки Интернет-платежей гарантирует Партнер(-ры).",
        "10.\tРАЗРЕШЕНИЕ СПОРОВ \n" +
        "10.1.\tВ случае наличия неурегулированных разногласий Стороны договорились о соблюдении претензионного порядка, при этом срок рассмотрения претензии составляет 5 (пять) рабочих дней с момента её получения. \n" +
        "10.2.\tВ случае невозможности достичь согласия между Сторонами путем переговоров в течение шестидесяти (60) календарных дней с момента получения другой Стороной письменной претензии, рассмотрение спора может быть передано любой заинтересованной Стороной в суд по месту регистрации Коробки.",
        "11.\tКОНФИДЕНЦИАЛЬНОСТЬ И ПЕРСОНАЛЬНЫЕ ДАННЫЕ \n" +
        "11.1.\tКаждая из Сторон обязуется не разглашать конфиденциальную информацию, полученную от другой Стороны в связи с исполнением Соглашения. Настоящая статья 11 Соглашения действует совместно с Политикой защиты и обработки персональных («Политика»).",
        "12.\tЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ \n" +
        "12.1.\tЕсли одно или несколько положений настоящего Соглашения будут признаны недействительными в соответствии со вступившим в силу судебным решением, остальные положения настоящего Соглашения остаются в силе, и Стороны продолжают исполнять свои обязательства способом, максимально соответствующим намерениям Сторон в момент заключения и (или) изменения настоящего Соглашения.\n" +
        "12.2.\tБездействие Коробки в случае нарушения Пользователем положений Соглашения не лишает Коробку права предпринять позднее соответствующие действия в защиту своих интересов и защиту прав на охраняемые в соответствии с законодательством элементы и содержимое Платформы.\n" +
        "12.3.\tНастоящее Соглашение и отношения Сторон, возникшие вследствие его заключения, регулируются правом Грузии.\n" +
        "12.4.\tНастоящее Соглашение, после принятия его положений Пользователем, признается равнозначным документу на бумажном носителе, подписанному собственноручной подписью Пользователя.",
    ]
    paragraphs.forEach((paragraph, i) => paragraphs[i] = paragraph.split("\n"));

    return (
        <PopupWrapperComponent isOpen={isOpen} className={"allow-policy-component"} zIndex={1000} closeWindow={closeComponent}>
            {/*<div className={"block block-1 allow-policy-fon"}>*/}
            {/*    <span className={"white-700-40"}>Пользовательское соглашение</span>*/}
            {/*</div>*/}
            <div className={"block block-2 scroll"}>
                <div className={"rules-block"}>
                    <div className={"paragraph"}>
                        <span className={"black-700-18"}>ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ</span>
                        {paragraphs.map((paragraph, key) => (
                            <span className={"black-400-16"} key={key}>
                                {paragraph.map((point, i) => (<>{point}{i !== paragraph.length - 1 && <><br/><br/></>}</>))}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </PopupWrapperComponent>
    )
}