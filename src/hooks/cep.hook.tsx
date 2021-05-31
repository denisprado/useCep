import {useCallback, useEffect, useState} from 'react';
import getDataFromCep from '~/services/cep';

type ZipCode = string;

export function useCep(zipCode: ZipCode | null) {
  const [dataCep, setDataCep] = useState(null);
  const [loadingCep, setLoadingCep] = useState(false);
  const [invalidCep, setInvalidCep] = useState(false);
  const [errorCepRequest, setErrorCepRequest] = useState(false);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    setEditable((!dataCep && !loadingCep && !invalidCep) || errorCepRequest);
  }, [dataCep, loadingCep, invalidCep, errorCepRequest]);

  const clearCepData = () => {
    setDataCep(null);
  };

  const getCep = useCallback(() => {
    if (zipCode?.length === 9) {
      getDataFromCep(zipCode)
        .then((dataCepResponse: any) => {
          if (!dataCepResponse.erro) {
            setInvalidCep(false);
            setDataCep(dataCepResponse);
          } else {
            clearCepData();
            setInvalidCep(true);
          }
        })
        .catch(() => {
          setErrorCepRequest(true);
          setInvalidCep(false);
        })
        .finally(() => setLoadingCep(false));
    } else {
      clearCepData();
      setInvalidCep(false);
    }
  }, [zipCode]);

  useEffect(() => {
    getCep();
  }, [zipCode]);

  return {
    dataCep,
    editable,
    loadingCep,
    invalidCep,
    errorCepRequest,
  };
}
