import { StyleSheet } from 'react-native'

export default StyleSheet.create({

    container: {
        flex: 1,
        padding: 15,
    },

    main: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    label: {
        fontSize: 16,
        textAlign: 'center',
    },

    input: {
        padding: 10,
        width: '100%',
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 4,
    },

    textArea: {
        height: 150,
        padding: 10,
        width: '100%',
        marginTop: 15,
        borderWidth: 1,
        borderRadius: 4,
        textAlign: 'justify',
        textAlignVertical: 'top',
    },

    buttonView: {
        marginTop: 30,
        width: '80%',
    },

});