$.onStart(() => {
    $.state.overlappingPlayers = [];
});

$.onUpdate((deltaTime) => {
    const lastOverlappingPlayers = $.state.overlappingPlayers;

    // Overlap Detector Shapeのコライダーに入っているオブジェクトを取得し、そのうちプレイヤーであるものを抽出する
    const overlappingObjects = $.getOverlaps();
    const overlappingHandles = overlappingObjects.map(overlappingObject => overlappingObject.handle);
    const overlappingPlayers = overlappingHandles.filter(handle => handle?.type === "player");

    // 新しくコライダーに入ったプレイヤー＝前のフレームでコライダーに入っておらず、このフレームで入っている
    const enterPlayers = overlappingPlayers.filter(player => !lastOverlappingPlayers.some(lastOverlappingPlayer => lastOverlappingPlayer.id === player.id));
    enterPlayers.forEach(player => {
        player.send("SendOsc", { value: true });
        $.log(`Send True to @${player.userId}`);
    });

    // コライダーから出たプレイヤー＝前のフレームでコライダーに入っており、このフレームで入っていない
    const exitPlayers = lastOverlappingPlayers.filter(player => !overlappingPlayers.some(overlappingPlayer => overlappingPlayer.id === player.id));
    exitPlayers.forEach(player => {
        player.send("SendOsc", { value: false });
        $.log(`Send False to @${player.userId}`);
    });

    $.state.overlappingPlayers = overlappingPlayers;
});