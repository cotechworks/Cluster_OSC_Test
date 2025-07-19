_.oscHandle.onReceive(messages => {
  const lines = [];

  messages.forEach((message, i) => {
    const { address, timestamp, values } = message;

    lines.push(`== message [${i + 1}/${messages.length}]`);
    lines.push(`address: ${address}`);
    lines.push(`timestamp: ${new Date(timestamp).toLocaleString()}`);

    values.forEach((value, j) => {
      lines.push(`= value [${j + 1}/${values.length}]`);

      lines.push(`getInt(): ${value.getInt()}`);
      lines.push(`getFloat(): ${value.getFloat()}`);
      lines.push(`getAsciiString(): ${value.getAsciiString()}`);
      lines.push(`getBlobAsUint8Array(): ${value.getBlobAsUint8Array()}`);
      lines.push(`getBlobAsUtf8String(): ${value.getBlobAsUtf8String()}`);
      lines.push(`getBool(): ${value.getBool()}`);
    });
  });

  _.log(lines.join("\n"));
});