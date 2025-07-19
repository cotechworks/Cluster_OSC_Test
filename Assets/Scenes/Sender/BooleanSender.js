// プレイヤーがギミックからメッセージを受け取ったときに、OSCメッセージを送信する
_.onReceive((messageType, arg, sender) => {
    if (messageType === "SendOsc") {
        // ギミックから受け取った値
        const value = arg.value;
        
        // OSCメッセージ用のValueを生成する
        // boolやnumberの値そのままでは送信できないことに注意
        const oscValues = [
            OscValue.bool(value),
        ];

        // AddressとValuesを設定してOSCメッセージを生成
        const oscMessage = new OscMessage("/Sample/Enter", oscValues);

        // OSCメッセージを送信
        _.oscHandle.send(oscMessage);

        _.log(`OSC Send ${value}`);
    }
}, { item: true, player: true });