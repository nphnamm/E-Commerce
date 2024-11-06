function DataIteration(props) {
    const { datas = [], startLength, endLength, children } = props;
    console.log(datas);
    return (
      <>
        {datas &&
          datas.length >= endLength &&
          datas
            .slice(startLength, endLength)
            .map((value) => children({ datas: value }))}
      </>
    );
  }
  
  export default DataIteration;
  