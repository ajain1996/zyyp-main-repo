
const baseURL = "http://20.120.104.2:";

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


const PaymentsManagerAPIPostRequest = async (successCallBack) => {
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

