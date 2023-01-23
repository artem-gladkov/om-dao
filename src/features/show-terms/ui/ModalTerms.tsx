import { Button, ModalBase } from "../../../shared/ui";
import {useEffect, useState} from "react";

const TERMS_KEY = 'is-terms-accepted'

export const ModalTerms = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    localStorage.setItem(TERMS_KEY, "true")
    setIsOpen(false);
  };

  useEffect(() => {
    const isTermsAcceptedExist = !!localStorage.getItem(TERMS_KEY)
    if(!isTermsAcceptedExist) {
      setIsOpen(true)
    }
  }, [])

  return (
    <ModalBase
      open={isOpen}
      onClose={onClose}
      header={<h1 className="p-8">Terms and Conditions</h1>}
      footer={
        <div className="flex justify-end p-8 bg-black/75">
          <Button onClick={onClose}>Ok</Button>
        </div>
      }
      useMask
    >
      <div className="space-y-4 p-8">
        <div>
          <h2>1. Introduction.</h2>
          <p>
            These Terms And Conditions (these “Terms” or these “Terms And
            Conditions”) contained herein on this webpage, shall govern your use
            of this website, including all pages within this website
            (collectively referred to herein below as this “Website”). These
            Terms apply in full force and effect to your use of this Website and
            by using this Website, you expressly accept all Terms And Conditions
            contained herein in full. You must not use this Website, if you have
            any objection to any of these Terms And Conditions. This Website is
            not for use by any minors (defined as those who are not at least 18
            years of age), and you must not use this Website if you are a minor.
          </p>
        </div>
        <div>
          <h2>2. Intellectual Property Rights.</h2>{" "}
          <p>
            Other than content you own, which you may have opted to include on
            this Website, under these Terms, Nexo and/or its licensors own all
            rights to the intellectual property and material contained in this
            Website, and all such rights are reserved. You are granted a limited
            license only, subject to the restrictions provided in these Terms,
            for purposes of viewing the material contained on this Website.
          </p>
        </div>
        <div>
          <h2>3. Restrictions.</h2>
          <p>
            You are expressly and emphatically restricted from all of the
            following: selling, sublicensing and/or otherwise commercializing
            any Website material; using this Website in any way that is, or may
            be, damaging to this Website; using this Website in any way that
            impacts user access to this Website; using this Website contrary to
            applicable laws and regulations, or in a way that causes; may cause,
            harm to the Website, or to any person or business entity; engaging
            in any data mining, data harvesting, data extracting or any other
            similar activity in relation to this Website, or while using this
            Website; Certain areas of this Website are restricted from access by
            you and Nexo may further restrict access by you to any areas of this
            Website, at any time, in its sole and absolute discretion. Any user
            ID and password you may have for this Website are confidential and
            you must maintain confidentiality of such information.
          </p>
        </div>
        <div>
          <h2> 4. Your Content.</h2>
          <p>
            In these Terms And Conditions, “Your Content” shall mean any audio,
            video, text, images or other material you choose to display on this
            Website. With respect to Your Content, by displaying it, you grant
            Nexo a non-exclusive, worldwide, irrevocable, royalty-free,
            sublicensable license to use, reproduce, adapt, publish, translate
            and distribute it in any and all media. Your Content must be your
            own and must not be infringing on any third party’s rights. Nexo
            reserves the right to remove any of Your Content from this Website
            at any time, and for any reason, without notice.
          </p>
        </div>
        <div>
          <h2>5. No warranties. </h2>
          <p>
            This Website is provided “as is,” with all faults, and Nexo makes no
            express or implied representations or warranties, of any kind
            related to this Website or the materials contained on this Website.
            Additionally, nothing contained on this Website shall be construed
            as providing consult or advice to you.
          </p>
        </div>
        <div>
          <h2> 6. Limitation of liability. </h2>
          <p>
            In no event shall Nexo, nor any of its officers, directors and
            employees, be liable to you for anything arising out of or in any
            way connected with your use of this Website, whether such liability
            is under contract, tort or otherwise, and Nexo, including its
            officers, directors and employees shall not be liable for any
            indirect, consequential or special liability arising out of or in
            any way related to your use of this Website.
          </p>
        </div>
        <div>
          <h2>7. Indemnification. </h2>
          <p>
            You hereby indemnify to the fullest extent Nexo from and against any
            and all liabilities, costs, demands, causes of action, damages and
            expenses (including reasonable attorney’s fees) arising out of or in
            any way related to your breach of any of the provisions of these
            Terms.
          </p>
        </div>
        <div>
          <h2> 8. Consent to communication:</h2>
          <p>
            You grant your explicit consent to Nexo’s use of your mobile phone
            number for the purpose of provision of any information and sending
            of any messages and notifications in regard to our contractual
            relations, including for marketing purposes.
          </p>
        </div>
        <div>
          <h2>9. Severability.</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or
            invalid under any applicable law, such unenforceability or
            invalidity shall not render these Terms unenforceable or invalid as
            a whole, and such provisions shall be deleted without affecting the
            remaining provisions herein.
          </p>
        </div>
        <div>
          <h2> 10. Variation of Terms.</h2>
          <p>
            Nexo is permitted to revise these Terms at any time as it sees fit,
            and by using this Website you are expected to review such Terms on a
            regular basis to ensure you understand all Terms And Conditions
            governing use of this Website.
          </p>
        </div>
        <div>
          <h2> 11. Assignment. </h2>
          <p>
            Nexo shall be permitted to assign, transfer, and subcontract its
            rights and/or obligations under these Terms without any notification
            or consent required. However, you shall not be permitted to assign,
            transfer, or subcontract any of your rights and/or obligations under
            these Terms.
          </p>
        </div>
        <div>
          <h2> 12. Entire Agreement. </h2>
          <p>
            These Terms, including any legal notices and disclaimers contained
            on this Website, constitute the entire agreement between Nexo and
            you in relation to your use of this Website, and supersede all prior
            agreements and understandings with respect to the same.
          </p>
        </div>
        <div>
          <h2>13. Governing Law & Jurisdiction.</h2>
          <p>
            These Terms will be governed exclusively by the substantive law of
            England and Wales. Any dispute arising out of or in connection with
            these Terms, unless amicably settled between the Parties, shall be
            referred to the competent court in London, England, determined as
            per the procedural law of England and Wales. You agree that any
            dispute resolution proceeding subject to the Applicable Law under
            the preceding sentence shall be conducted only on an individual
            basis and not as a plaintiff or class member in any purported class,
            consolidated or representative action or proceeding. No court or
            other dispute resolution authority can consolidate or join more than
            one claim and can otherwise preside over any form of a consolidated,
            representative, or class proceeding. Any relief awarded cannot
            affect other Clients of Nexo.
          </p>
        </div>
      </div>
    </ModalBase>
  );
};
