import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = (/*{ navigation }*/) => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();
  const [refreshing, setRefreshing] = React.useState(false);

  //console.log(results);

  const filterResultsByPrice = (price) => {
    // price == '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  }

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false), searchApi('pasta'));
  }, [refreshing]);

  return (
    <>
    {/*<View style= {{flex:1}} /*style={{ borderColor: 'red', borderWidth: 10 }}*/ /*style={{ marginLeft: 30 }}>*/}
      <SearchBar 
        term={term} 
        //onTermChange={newTerm => setTerm(newTerm)}
        //onTermSubmit={() => searchApi}>
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}>
      </SearchBar>
      {errorMessage ? <Text>{errorMessage}</Text>: null}
      {/*<Text>We have found {results.length} results</Text>*/}
      <ScrollView
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <ResultsList 
          results={filterResultsByPrice('$')} 
          title="Cost Effective"
          /*navigation={navigation}*/>
        </ResultsList>
        <ResultsList 
          results={filterResultsByPrice('$$')} 
          title="Bit Pricier"
          /*navigation={navigation}*/>
        </ResultsList>
        <ResultsList 
          results={filterResultsByPrice('$$$')} 
          title="Big Spender"
          /*navigation={navigation}*/>
        </ResultsList>
      </ScrollView>
    {/*</View>*/}
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;