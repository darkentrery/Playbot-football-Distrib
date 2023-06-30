import {Top376Component} from "../top376Component/Top376Component";
import BaseRoutes from "../../routes/BaseRoutes";
import VisibleMainWrapper from "../../redux/containers/VisibleMainWrapper";
import {useState} from "react";
import FaqItemList from "../FaqItemList/FaqItemList";
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next";

export const FaqPageComponent = () => {
    const {t, i18n} = useTranslation();

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
                    <FaqParagraph title={t('faqPage.faq1.title')}>
                        
                    </FaqParagraph>
                    <FaqParagraph title={t('faqPage.faq2.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq2.text1')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq2.text2')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq2.text3')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq2.text4')}</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq3.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq3.text1')}</span>
                        <FaqItemList>
                            <span className={"black-400-14"}>{t('faqPage.faq3.text2')}</span>
                            <span className={"black-400-14"}>{t('faqPage.faq3.text3')}</span>
                            <span className={"black-400-14"}>{t('faqPage.faq3.text4')}</span>
                            <span className={"black-400-14"}>{t('faqPage.faq3.text5')}</span>
                        </FaqItemList>
                        <span className={"black-400-14"}>{t('faqPage.faq3.text6')}</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq4.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq4.text1')}</span>
                        <FaqItemList>
                            <span className={"black-400-14"}>{t('faqPage.faq4.text2')}</span>
                            <span className={"black-400-14"}>{t('faqPage.faq4.text3')}</span>
                        </FaqItemList>
                        <span className={"black-400-14"}>{t('faqPage.faq4.text4')}</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq5.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq5.text1')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq5.text2')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq5.text3')}</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq6.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq6.text1')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq6.text2')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq6.text3')}</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq7.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq7.text1')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq7.text2')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq7.text3')}</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq8.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq8.text1')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq8.text2')}</span>
                        <span className={"black-400-14"}>{t('faqPage.faq8.text3')}</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq9.title')}>
                        <span className={"black-400-14"}>(скоро)</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq10.title')}>
                        <span className={"black-400-14"}></span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq11.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq11.text1')}</span>
                    </FaqParagraph>

                    <FaqParagraph title={t('faqPage.faq12.title')}>
                        <span className={"black-400-14"}>{t('faqPage.faq12.text1')}</span>
                    </FaqParagraph>
                </div>
            </div>
        </VisibleMainWrapper>
    )
}