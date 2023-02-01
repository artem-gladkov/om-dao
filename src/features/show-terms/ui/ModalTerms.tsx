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
          <p>
           1. OM DAOLLC (hereinafter - the Company) does not provide services
                to customers who reside in countries (are residents of countries) 
                included in the list of high-risk countries and other controlled 
                jurisdictions by the Financial Action Task Force (FATF) 
                [http://www.fatf-gafi.org/countries/#high-risk].
          </p>
        </div>
        <div>
          <p>
          2.  As of June 29. 2021 the list of Prohibited Jurisdictions includes the 
                following countries (this list is subject to change on a case-by-case basis, 
                depending on your specific situation): Albania, Barbados, Bermuda, 
                Burkina Faso,  Cambodia, Cayman Islands, Democratic Republic of Congo (DRC), 
                Haiti, Jamaica, Mali, Jordan, Malta, Mauritius, Morocco, Mozambique, Myanmar, 
                Panama, Philippines, Senegal, South Sudan, Syria, Tanzania, Uganda, Yemen,
                Zimbabwe, Democratic People's Republic of Korea (DPRK), Iran, USA.
          </p>
        </div>
        <div>
          <p>
          3. The Company will not accept clients who are residents/citizens of the USA. 
                If the Company believes there are grounds to classify 
                a prospective client as a U.S. resident/citizen, the client will be asked to 
                provide documentation proving alternate residency and/or citizenship.
          </p>
        </div>
        <div>
          <p>
          4. The Company warrants that it understands and complies with all 
                applicable laws under which it operates and will only advertise its 
                services where local regulations allow or do not prohibit it.
          </p>
        </div>
        <div>
          <p>
            By clicking "Next" you acknowledge that you are not a resident 
            of a country where OM DAOLLC does not provide its services.
          </p>
        </div>
      </div>
    </ModalBase>
  );
};
