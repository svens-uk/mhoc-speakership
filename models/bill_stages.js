module.exports = {
    first_reading: {
        key: 'first_reading',
        title: '1st Reading',
        post_to: 'mhoc',
        options: [
            'second_reading'
        ],
        final: false,
        format: `
# {{ bill_title }}

{{ bill_text }}

***

{{ opening_speech }}`
    },
    second_reading: {
        key: 'second_reading',
        title: '2nd Reading',
        post_to: 'mhoc',
        options: [
            'amendment_vote',
            'third_reading_vote'
        ],
        final: false,
        format: `**Order, order!**

***

# {{ bill_title }}

***

{{ bill_text }}

***

{{ opening_speech }}

***

**This reading ends {{ closing_date }} at 10pm {{ timezone }}.**
`
    },
    amendment_vote: {
        key: 'amendment_vote',
        title: 'Report Division',
        post_to: 'mhocmp',
        options: [
            'third_reading',
            'amendment_vote'
        ],
        final: false,
        format: `
The question is that the amendment be made.

**Division! Clear the lobby.**

***

# {{ bill_title }}

***

{{ amendment_text }}

***

**This division ends {{ closing_date }} at 10pm {{ timezone }}.**

Vote Aye, No, or Abstain to each amendment.`
    },
    third_reading: {
        key: 'third_reading',
        title: '3rd Reading',
        post_to: 'mhoc',
        options: [
            'third_reading_vote'
        ],
        final: false,
        format: `**Order, order!**

***

# {{ bill_title }}

***

{{ bill_text }}

***

**This reading ends {{ closing_date }} at 10pm {{ timezone }}.**
`
    },
    third_reading_vote: {
        key: 'third_reading_vote',
        title: '3rd Reading Division',
        post_to: 'mhocmp',
        options: [
            'pass',
            'fail'
        ],
        final: false,
        format: `The question is that the bill be now read a third time.
        
**Division! Clear the lobby.**

***

# {{ bill_title }}

***

{{ bill_text }}

This division ends {{ closing_date }} at 10pm {{ timezone }}.

***

Vote Aye, No, or Abstain.`
    },
    pass: {
        key: 'pass',
        title: 'Royal Assent',
        post_to: 'mhoc',
        final: true,
        format: `I have to notify the House, in accordance with the Royal Assent Act 1967, that the King has signified his Royal Assent to the following Act:

# {{ bill_title }}

***
        
{{ bill_text }}`
    },
    fail: {
        key: 'fail',
        title: 'Bill Failed',
        post_to: 'mhoc',
        final: true,
        format: `**Order!** I have to notify the House that the following bill has been voted down at division and is therefore thrown out:

# {{ bill_title }}

***

{{ bill_text }}`
    },
    withdrawn: {
        key: 'withdrawn',
        title: 'Notice of Withdrawal',
        final: true,
        post_to: 'mhoc',
        format: `**Order!** I have to notify the House that the following bill has been withdrawn at the request of its author:

# {{ bill_title }}

***

{{ bill_text }}`
    }
}
