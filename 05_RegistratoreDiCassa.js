/*
Progetta una funzione per il cassetto di un registratore di cassa checkCashRegister() che accetta il prezzo di acquisto come primo argomento (price), il pagamento come secondo argomento (cash) e il cassetto dei contanti (cash-in-drawer, cid) come terzo argomento.

cid è un array 2D che elenca la valuta disponibile.

La funzione checkCashRegister() dovrebbe restituire sempre un oggetto con una chiave status e una chiave change.

Restituisce {status: "INSUFFICIENT_FUNDS", change: []} se il cash-in-drawer è inferiore al cambio dovuto, o se non è possibile restituire il cambio esatto.

Restituisce {status: "CLOSED", change: [...]} con il cid come valore per la chiave change se è uguale al cambio dovuto.

Altrimenti, restituisce {status: "OPEN", change: [...]}, con il cambio dovuto in monete e banconote, ordinati in ordine dal valore più alto al più basso, come valore della chiave change.
 */

/*
Unità monetaria	            Importo
Penny	                    $0.01 (PENNY)
Nichel	                    $0.05 (NICKEL)
Dime	                    $0.1 (DIME)
Quarter	                    $0.25 (QUARTER)
Dollar	                    $1 (ONE)
Five Dollars	            $5 (FIVE)
Ten Dollars	                $10 (TEN)
Twenty Dollars	            $20 (TWENTY)
One-hundred Dollars  	    $100 (ONE HUNDRED)
 */

//Ecco qui sotto un esempio di array cash-in-drawer:
/*
[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
 */

function checkCashRegister(price, cash, cid) {

  const unita = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

    let change = cash - price;
    let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

    if(change > totalCid){
      return {status:"INSUFFICIENT_FUNDS", change:[]};
    }
    else if(change.toFixed(2) === totalCid){
      return {status:"CLOSED", change :cid};
    }
    else{
      let changeArray = [];
      cid = cid.reverse();

      for(let i = 0; i < cid.length; i++){
        let nomeMoneta = cid[i][0];
        let totaleMoneta = cid[i][1];
        let valoreMoneta = unita.find(u => u[0] === nomeMoneta)[1];
        let quantitaMoneta = (totaleMoneta / valoreMoneta).toFixed(2);
        let moneteRestituite = 0;

        while(change >= valoreMoneta && quantitaMoneta > 0){
          change -= valoreMoneta;
          change = change.toFixed(2);
          quantitaMoneta --;
          moneteRestituite ++;
        }

        if(moneteRestituite > 0){
          changeArray.push([nomeMoneta, moneteRestituite * valoreMoneta])
        }

      }

      if(change > 0){
        return {status:"INSUFFICIENT_FUNDS",change:[]};
      }

      return {status:"OPEN", change:changeArray}
    }

}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);//Registratore di cassa


/*
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) dovrebbe restituire un oggetto.

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) dovrebbe restituire {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) dovrebbe restituire {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) dovrebbe restituire {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) dovrebbe restituire {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) dovrebbe restituire {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
 */