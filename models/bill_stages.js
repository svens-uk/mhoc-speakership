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
            'second_reading_vote'
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
    second_reading_vote: {
        key: 'second_reading_vote',
        title: '2nd Reading Division',
        post_to: 'mhocmp',
        options: [
            'pass',
            'fail',
            'committee',
            'amendment_reading',
            'amendment_vote',
            'third_reading'
        ],
        final: false,
        format: `The question is that the bill be now read a second time.
        
**Division! Clear the lobby.**

***

# {{ bill_title }}

***

{{ bill_text }}

***

{{ opening_speech }}

***

**This division ends {{ closing_date }} at 10pm {{ timezone }}.**

Vote Aye, No, or Abstain.`
    },
    committee: {
        key: 'committee',
        title: 'Committee Stage',
        post_to: 'mhoc',
        options: [
            'amendment_reading',
            'amendment_vote',
            'third_reading',
            'third_reading_vote'
        ],
        final: false,
        format: `**Order, order!**

The Committee of the Whole House shall now proceed to consider the following Bill:

***

# {{ bill_title }}

***

{{ bill_text }}

***

{{ opening_speech }}

***

**The committee shall consider amendments, or the bill shall proceed if there are none moved, on {{ closing_date }} at 10pm {{ timezone }}.**`
    },
    amendment_reading: {
        key: 'amendment_reading',
        title: 'Report Stage',
        post_to: 'mhoc',
        options: [
            'amendment_vote',
            'third_reading'
        ],
        final: false,
        format: `
**Order, order!**

***

# {{ bill_title }}

***

{{ bill_text }}

***

{{ amendment_text }}

***

**The House shall divide on the amendments on {{ closing_date }} at 10pm {{ timezone }}.**`
    },
    amendment_vote: {
        key: 'amendment_vote',
        title: 'Report Division',
        post_to: 'mhocmp',
        options: [
            'third_reading',
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
        final: true
    },
    withdrawn: {
        key: 'withdrawn',
        title: 'Notice of Withdrawal',
        final: true,
        post_to: 'mhoc',
        format: `**Order!** I have to notify the House that the following bill has been withdrawn at the request of its author:

# {{ bill_title }}`
    }
}
