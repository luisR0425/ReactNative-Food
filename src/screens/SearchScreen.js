import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage] = useResults();

  //console.log(results);

  const filterResultsByPrice = (price) => {
    // price == '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  }

  return (
    <View /*style={{ marginLeft: 30 }}*/>
      <SearchBar 
        term={term} 
        //onTermChange={newTerm => setTerm(newTerm)}
        //onTermSubmit={() => searchApi}>
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}>
      </SearchBar>
      {errorMessage ? <Text>{errorMessage}</Text>: null}
      <Text>We have found {results.length} results</Text>
      <ScrollView>
        <ResultsList 
          results={filterResultsByPrice('$')} 
          title="Cost Effective">
        </ResultsList>
        <ResultsList 
          results={filterResultsByPrice('$$')} 
          title="Bit Pricier">
        </ResultsList>
        <ResultsList 
          results={filterResultsByPrice('$$$')} 
          title="Big Spender">
        </ResultsList>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;