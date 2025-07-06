$.onStart(() => {
    $.state.knownPlayers = [];
});

$.onUpdate(() => {
    // 既知（PlayerScriptをset済み）のプレイヤーのうち、退出していないプレイヤー
    const knownPlayers = $.state.knownPlayers.filter(knownPlayer => knownPlayer?.exists());

    // ワールド内にいるすべてのプレイヤー
    const allPlayers = $.getPlayersNear($.getPosition(), Infinity).filter(player => player?.exists());

    // 新しく入室したプレイヤー＝すべてのプレイヤーのうち既知のプレイヤーに含まれないプレイヤー
    const newPlayers = allPlayers.filter(player => !knownPlayers.some(knownPlayer => knownPlayer.id === player.id));

    // 新しく入室したプレイヤーにPlayerScriptを適用する
    newPlayers.forEach(newPlayer => {
        $.setPlayerScript(newPlayer);
    });

    // 既知プレイヤー一覧を更新
    $.state.knownPlayers = allPlayers;
});