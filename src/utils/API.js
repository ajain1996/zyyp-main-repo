
const baseURL = "https://nextopay.com/";

export const getTransactionsOnOrganizationLevel = async (successCallBack) => {
    console.log('\n\n getTransactionsOnOrganizationLevel Called : ');
    var bodyobj = {
        "from_date": "2021-12-28",
        "to_date": "2022-01-28",
        "transaction_status": "UNCLAIMED"
    }

    try {
        let response = await fetch(baseURL + 'zip/Get_transactions_on_organization_level', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyobj),
        });
        let json = await response.json();
        console.log('\n\n getTransactionsOnOrganizationLevel success', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n getTransactionsOnOrganizationLevel Failed : ')
        successCallBack(null);
    }
}

const WalletManagetAPIPostRequest = async (successCallBack) => {
    console.log('\n\n WalletManagetAPIPostRequest Called : ');
    var bodyobj = {}

    try {
        let response = await fetch(baseURL + '8083/', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyobj),
        });
        let json = await response.json();
        console.log('\n\n WalletManagetAPIPostRequest success', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n WalletManagetAPIPostRequest Failed : ')
        successCallBack(null);
    }
}


const TransactionManagerAPIPostRequest = async (successCallBack) => {
    console.log('\n\n TransactionManagerAPIPostRequest Called : ');
    var bodyobj = {}

    try {
        let response = await fetch(baseURL + '8081/', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyobj),
        });
        let json = await response.json();
        console.log('\n\n TransactionManagerAPIPostRequest success', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n TransactionManagerAPIPostRequest Failed : ')
        successCallBack(null);
    }
}


export const PaymentsManagerAPIPostRequest = async (successCallBack) => {
    console.log('\n\n PaymentsManagerAPIPostRequest Called : ');
    var bodyobj = {}

    try {
        let response = await fetch(baseURL + '8082/', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyobj),
        });
        let json = await response.json();
        console.log('\n\n PaymentsManagerAPIPostRequest success', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n PaymentsManagerAPIPostRequest Failed : ')
        successCallBack(null);
    }
}


export const createAccountAPIPostRequest = async (successCallBack) => {
    console.log('\n\n createAccountAPIPostRequest Called : ');
    var bodyobj = {
        "account_type": "PERSONAL",
        "user_id": 200001
    }

    try {
        let response = await fetch(baseURL + '8082/', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyobj),
        });
        let json = await response.json();
        console.log('\n\n createAccountAPIPostRequest success', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n createAccountAPIPostRequest Failed : ')
        successCallBack(null);
    }
}


export const updateAccountAPIPostRequest = async (successCallBack) => {
    console.log('\n\n updateAccountAPIPostRequest Called : ');
    var bodyobj = {
        "account_type": "PERSONAL",
        "user_id": 200001
    }

    try {
        let response = await fetch(baseURL + 'accounts/:accountId?action=LOCK', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyobj),
        });
        let json = await response.json();
        console.log('\n\n updateAccountAPIPostRequest success', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n updateAccountAPIPostRequest Failed : ')
        successCallBack(null);
    }
}


export const createCardsAPIPostRequest = async (cardId, card_type, account_id, notes, user_id, successCallBack) => {
    console.log('\n\n createCardsAPIPostRequest Called : ');
    var bodyobj = {
        "card_type": "PHYSICAL",
        "account_id": "0ujsswThIGTUYm2K8FjOOfXtY1K",
        "notes": "notes",
        "user_id": 200001
    }

    try {
        let response = await fetch(baseURL + 'cards', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyobj),
        });
        let json = await response.json();
        console.log('\n\n createCardsAPIPostRequest success', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n createCardsAPIPostRequest Failed : ')
        successCallBack(null);
    }
}


export const updateCardsAPIPostRequest = async (cardId, card_type, account_id, notes, user_id, successCallBack) => {
    console.log('\n\n updateCardsAPIPostRequest Called : ');
    var bodyobj = {
        "card_type": "PHYSICAL",
        "account_id": "0ujsswThIGTUYm2K8FjOOfXtY1K",
        "notes": "notes",
        "user_id": 200001
    }

    try {
        let response = await fetch(baseURL + `cards/:${cardId}?action=LOCK`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyobj),
        });
        let json = await response.json();
        console.log('\n\n updateCardsAPIPostRequest success', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n updateCardsAPIPostRequest Failed : ')
        successCallBack(null);
    }
}

